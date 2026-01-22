import { useEffect, useRef, useState } from "react";
import "./VideoMeetComponent.css";

import { io } from "socket.io-client";
import { TextField, Button } from "@mui/material";

const server_url = "http://localhost:5000";

let connections = {};

const peerConfigConnections = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" }
    ]
};

function VideoMeetComponent() {
    const socketRef = useRef(null);
    const socketIdRef = useRef(null);
    const localVideoRef = useRef(null);

    const videoRef = useRef([]);

    const [videos, setVideos] = useState([]);

    const [videoAvailable, setVideoAvailable] = useState(true);
    const [audioAvailable, setAudioAvailable] = useState(true);

    const [video, setVideo] = useState(true);
    const [audio, setAudio] = useState(true);

    const [askForUsername, setAskForUsername] = useState(true);
    const [username, setUsername] = useState("");

    const getPermissions = async () => {
        try {
            let cam = await navigator.mediaDevices.getUserMedia({ video: true });
            let mic = await navigator.mediaDevices.getUserMedia({ audio: true });

            setVideoAvailable(!!cam);
            setAudioAvailable(!!mic);

            let stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });

            window.localStream = stream;
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getPermissions();
    }, []);

    const getUserMediaSuccess = (stream) => {
        if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
        }
        window.localStream = stream;
    };

    const getUserMedia = () => {
        if (video || audio) {
            navigator.mediaDevices.getUserMedia({ video, audio })
                .then(getUserMediaSuccess)
                .catch(e => console.error(e));
        } else {
            try {
                let tracks = localVideoRef.current.srcObject.getTracks();
                tracks.forEach(t => t.stop());
            } catch (e) { }
        }
    };

    useEffect(() => {
        if (video !== undefined && audio !== undefined) {
            getUserMedia();
        }
    }, [video, audio]);

    const gotMessageFromServer = (fromId, message) => {
        let signal = JSON.parse(message);

        if (fromId !== socketIdRef.current && connections[fromId]) {

            if (signal.sdp) {
                connections[fromId]
                    .setRemoteDescription(new RTCSessionDescription(signal.sdp))
                    .then(() => {
                        if (signal.sdp.type === "offer") {
                            connections[fromId]
                                .createAnswer()
                                .then(answer => {
                                    connections[fromId].setLocalDescription(answer);

                                    socketRef.current.emit(
                                        "signal",
                                        fromId,
                                        JSON.stringify({ sdp: answer })
                                    );
                                });
                        }
                    });
            }

            if (signal.ice) {
                connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice));
            }
        }
    };

    const connectToSocketServer = () => {
        socketRef.current = io(server_url, { secure: false });

        socketRef.current.on("signal", gotMessageFromServer);

        socketRef.current.on("connect", () => {

            socketRef.current.emit("join-call", window.location.href);
            socketIdRef.current = socketRef.current.id;

            socketRef.current.on("user-left", (id) => {
                setVideos((list) => list.filter(v => v.socketId !== id));
            });

            socketRef.current.on("user-joined", (id, clients) => {
                clients.forEach((cid) => {

                    connections[cid] = new RTCPeerConnection(peerConfigConnections);

                    connections[cid].onicecandidate = (event) => {
                        if (event.candidate) {
                            socketRef.current.emit("signal",
                                cid,
                                JSON.stringify({ ice: event.candidate })
                            );
                        }
                    };

                    connections[cid].ontrack = (event) => {
                        let exists = videoRef.current.find(v => v.socketId === cid);

                        if (!exists) {
                            let newVideo = {
                                socketId: cid,
                                stream: event.streams[0],
                                autoPlay: true,
                                playsInline: true
                            };

                            setVideos((prev) => {
                                const updated = [...prev, newVideo];
                                videoRef.current = updated;
                                return updated;
                            });
                        }
                    };

                    if (window.localStream) {
                        window.localStream.getTracks().forEach(track => {
                            connections[cid].addTrack(track, window.localStream);
                        });
                    }
                });

                if (id === socketIdRef.current) {
                    for (let cid in connections) {
                        if (cid === socketIdRef.current) continue;

                        connections[cid]
                            .createOffer()
                            .then((desc) => {
                                connections[cid].setLocalDescription(desc);
                                socketRef.current.emit(
                                    "signal",
                                    cid,
                                    JSON.stringify({ sdp: desc })
                                );
                            });
                    }
                }
            });
        });
    };

    const getMedia = () => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);

        connectToSocketServer();
    };

    const connect = () => {
        setAskForUsername(false);
        getMedia();
    };

    return (
        <div>
            {askForUsername ? (
                <div>
                    <h2>Enter into Lobby</h2>

                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <Button variant="contained" onClick={connect}>
                        Connect
                    </Button>

                    <div>
                        <video ref={localVideoRef} autoPlay muted></video>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default VideoMeetComponent;
