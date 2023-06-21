import React, { useState } from 'react'
import { auth } from '../../FirebaseConfig';
import { NavLink, useNavigate } from 'react-router-dom';
import "./Profile.scss";
import Nav from '../Navigation/Nav';

const Profile = () => {

  const [formData, setFormData] = useState({
    firstname: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { firstname, email } = formData;

  const afterSignOut = useNavigate();

  const onLogOut = () => {
    auth.signOut();
    afterSignOut("/");
    alert("You Are Successfully Logout");
  }

  return (
    <>
      <div>
        <Nav />
        <div className="user_info">

          <div className="fullname">
            <input
              type="text"
              value={firstname}
            />

            <input
              type="email"
              value={email}
            />
          </div>

          <div className="profile_picture">
            <img src="" alt="" />
          </div>

        </div>

        <div className="buttons">
          <button onClick={onLogOut}>sign out</button>
          <button>Change Details</button>
        </div>

      </div>

      <div className="create_list_button" >
        <NavLink to="/CreateList">
          Create List
        </NavLink>
      </div>
    </>
  )
}

export default Profile;


