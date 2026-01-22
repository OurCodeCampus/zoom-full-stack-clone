import React from "react";
import { Link } from "react-router-dom";
export function Hero() {
    return (
        <section className="hero-section">
            <div className="hero-left-section">
                <p className="hero-top-content">Welcome to <span>"OpenCame"</span></p>
                <h1 className="hero-headline"><span>Connect</span> with your<br /> Love Ones</h1>
                <p className="hero-desc">Cover a distance by OpenCame Video Calling...</p>
                <div className="hero-btn">
                    <Link to={"/auth"} className="get-started-btn btn">Get Started</Link>
                </div>
            </div>

            <div className="hero-right-section">
                <img src="/media/images/hero-img-2.png" alt="hero-img" className="hero-head-img" />
            </div>
        </section >
    )
}