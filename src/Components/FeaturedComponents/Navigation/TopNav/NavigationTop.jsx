import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavigationTop.css";



const NavigationTop = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(true);

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
                <NavLink to="/" className="logo">logo</NavLink>

                <button
                    className="nav_button"
                    onClick={handleNavElements}
                >
                    Toggle
                </button>
            </div>

            {
                isMenuOpen &&
                (
                    <>
                        <div className="nav_links">
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
