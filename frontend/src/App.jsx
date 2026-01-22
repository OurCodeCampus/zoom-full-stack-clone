
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './pages/Landings';
import Authentication from './pages/authentication';
// import { AuthProvider } from './contexts/AuthContext';
// import VideoMeetComponent from './pages/VideoMeetComponent';
// import History from './pages/history';

function App() {
    return (
        <div className="App">

            <Router>




                <Routes>

                    <Route path='/' element={<LandingPage />} />

                    {/* {/* <Route path='/auth' element={<Authentication />} /> */}
                    <Route path='/history' element={<History />} />
                    <Route path='/:url' element={<VideoMeetComponent />} /> */}
                </Routes>

            </Router>
        </div>
    );
}

export default App;
