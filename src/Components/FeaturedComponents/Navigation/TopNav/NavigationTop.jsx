import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavigationTop.css";
import { NavigationLinks } from "../../../../Data/NavigationData";



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
        <>
            <nav className="navigation_top">
                <section className="navigation_elements y_axis_center">
                    <div className="logo_menu y_axis_center">
                        <div className="menu_button x_y_axis_center">
                            <button
                                onClick={handleNavElements}
                            >
                                menu
                            </button>
                        </div>

                        <div className="logo y_axis_center">
                            <span><img src="" alt="" /></span>
                            <h1>logo</h1>
                        </div>
                    </div>
                </section>
            </nav>

            <section className={`navigation_links x_y_axis_center ${isMenuOpen === true ? "navigation_overlay" : ""}`}>
                <div className="nav_link">
                    <div className="links_conatainer">
                        {
                            NavigationLinks.map((data) => {
                                return (
                                    <>
                                        <div className="link_options">
                                            <NavLink to={data.navlink} key={data.id}>{data.name}</NavLink>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="box_overlay" onClick={handleOverlayClick}></div>
            </section>
        </>
    )

    // return (
    //     <nav className="nav_top">

    //         <div className="nav_elements y_axis_center">
    //             <button
    //                 className="nav_button"
    //                 onClick={handleNavElements}
    //             >
    //                 menu
    //             </button>

    //             <NavLink to="/" className="logo">logo</NavLink>
    //         </div>

    //         {
    //             isMenuOpen &&
    //             (
    //                 <>
    //                     <div className={`nav_links ${isMenuOpen === true ? "open" : ""}`}>
    //                         <div className="nav_options">
    //                             <ul>
    //                                 <li>one</li>
    //                                 <li>two</li>
    //                                 <li>three</li>
    //                             </ul>
    //                         </div>
    //                         <div className="nav_overlay" onClick={handleOverlayClick}></div>
    //                     </div>
    //                 </>
    //             )
    //         }
    //     </nav>
    // )
}



export default NavigationTop;
