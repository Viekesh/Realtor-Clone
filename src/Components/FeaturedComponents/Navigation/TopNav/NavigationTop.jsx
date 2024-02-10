import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavigationTop.css";



const NavigationTop = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavElements = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const handleOverlayClick = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    }

    return (
        <nav className="nav_top">

            <div className="nav_elements y_axis_center">
                <button
                    className="nav_button"
                    onClick={handleNavElements}
                >
                    menu
                </button>

                <NavLink to="/" className="logo">logo</NavLink>
            </div>

            {
                isMenuOpen &&
                (
                    <>
                        <div className={`nav_links ${isMenuOpen === true ? "open" : ""}`}>
                            <div className="nav_options">
                                <ul>
                                    <li>one</li>
                                    <li>two</li>
                                    <li>three</li>
                                </ul>
                            </div>
                            <div className="nav_overlay" onClick={handleOverlayClick}></div>
                        </div>
                    </>
                )
            }
        </nav>
    )
}



export default NavigationTop;
