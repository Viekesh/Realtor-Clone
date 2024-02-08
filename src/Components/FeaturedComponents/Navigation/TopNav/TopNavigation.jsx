import { useState } from "react";
import "./TopNavigation.css";



const TopNavigation = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleOverlayClick = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    }

    return (

        <nav className="top_navigation">
            <div className="nav_button">
                <button onClick={handleMenuToggle}>Toggle <br /> Menu</button>
            </div>

            {
                isMenuOpen &&
                (
                    <>
                        <div className="menu_links">
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                            </ul>
                        </div>
                        <div className="nav_overlay" onClick={handleOverlayClick}></div>
                    </>
                )
            }
        </nav>

    )
}



export default TopNavigation;