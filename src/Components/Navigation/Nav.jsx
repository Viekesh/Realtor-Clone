import React, { useEffect, useState } from 'react';
import './nav.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink } from 'react-router-dom';
import { NavigationLinks } from "../../Data/NavigationData";
import { auth } from '../../FirebaseConfig';
import SignIn from '../Auth/SignIn';

const Nav = () => {

  const [showMenu, setShowMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMenu(!showMenu);
    document.querySelector("body").classList.toggle("body-overflow-visible");
  }



  // Sign In Form
  const [showSignInForm, setShowSignInForm] = useState(false);

  const [forgotPassButton, setForgotPassButton] = useState(false);

  const [registerButton, setRegisterButton] = useState(false);

  const toggleSignInWindow = () => {

    setShowSignInForm(!showSignInForm);

    setForgotPassButton(!forgotPassButton);

    setRegisterButton(!registerButton);

    document.querySelector("body").classList.toggle("body-overflow-visible");

  }



  const [userName, setUserName] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUserName(authUser);
      } else {
        setUserName(null);
      }
    })
  })

  const userID = userName?.uid;



  return (
    <>
      <div className="navigation x_y_axis_center">
        <div className="for_mobile y_axis_center">

          <div className="menu_icon">
            <div className="only-mobile mobile-menu-button-wrapper">
              <button
                className={`hamburger hamburger--3dx x_y_axis_center ${showMenu ? "is-active" : ""}`}
                type="button"
                onClick={toggleMobileMenu}
              >
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
            </div>
          </div>

          <div className="profile_link x_y_axis_center">
            {
              userID ?
                (<section className="x_y_axis_center">
                  <AccountCircleIcon />
                </section>)
                :
                (<section className={`x_y_axis_center`} onClick={toggleSignInWindow}>
                  <AccountCircleIcon />
                </section>)
            }

            <div className={`sign_in_form ${showSignInForm ? "sign_in_form_overlay" : ""}`}>
              <SignIn />
            </div>

            <div className={`forgot_pass_button ${forgotPassButton ? "forgot_pass_overlay" : ""}`}>
              <NavLink to="/">
                <button>Forgot Password</button>
              </NavLink>
            </div>

            <div className={`register_button ${registerButton ? "register_button_overlay" : ""}`}>
              <NavLink to="/Register">
                <button>Register</button>
              </NavLink>
            </div>

          </div>



          <div className={`navigation_section ${showMenu ? "overlay" : ""}`} id='nav_links'>
            <div className="navigation_links">
              {
                NavigationLinks.map((getData) => {
                  return (
                    <NavLink to={getData.link} key={getData.id}>
                      {getData.name}
                    </NavLink>
                  )
                })
              }
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Nav;


