import React, { useState } from 'react'
import { auth } from '../../FirebaseConfig';
import { useNavigate } from 'react-router-dom';

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
    <div><button onClick={onLogOut}>sign out</button></div>
  )
}

export default Profile;


