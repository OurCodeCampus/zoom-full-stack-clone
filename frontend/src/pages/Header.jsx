import React from "react";
import { Link } from "react-router-dom";

export function Header() {
    return (
        <header className="header">
            <nav className="navigation-bar">

                {/* Logo */}
                <Link to={"#"} className="logo-bar">
                    <img src="/media/images/logo.svg" alt="logo" className="img-logo" />
                    <h2 className="text-logo">OpenCome</h2>
                </Link>

                {/* Navigation + Hamburger */}
                <div className="hamburger-menu">

                    {/* Hidden Checkbox for toggle */}
                    <input
                        type="checkbox"
                        className="hamburger-check-box"
                        id="hamburger-check-btn"
                        autoComplete="off"
                    />

                    {/* Hamburger icon */}
                    <label htmlFor="hamburger-check-btn" className="hamburger-lines">
                        <span className="line"></span>
                        <span className="line"></span>
                        <span className="line"></span>
                    </label>

                    {/* Navigation List */}
                    <ul className="nav-list">
                        <li className="nav-items">
                            <Link to={""} className="nav-link">
                                <i className="fa-solid fa-user"></i> Guest Mode
                            </Link>
                        </li>
                        <li className="nav-items">
                            <Link to={""} className="nav-link">
                                <i className="fa-solid fa-user-pen"></i> Register
                            </Link>
                        </li>
                        <li className="nav-items">
                            <Link to={""} className="nav-link">
                                <i className="fa-solid fa-user-check"></i> Login
                            </Link>
                        </li>
                    </ul>
                </div>

            </nav>
        </header>
    );
}
