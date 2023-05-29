import React from 'react';
import "./OAuth.scss";
import { FcGoogle } from "react-icons/fc";






const OAuth = () => {
    
    return (
        <>
            <div className="oauth for_android">
                <button type="button">
                    <FcGoogle className="oauth_icon" />
                    &nbsp; Continue With Google
                </button>
            </div>
            <div className="oauth for_desktop">
                <button type="button">
                    <FcGoogle className="oauth_icon" />
                    &nbsp; Continue With Google
                </button>
            </div>
        </>
    )
}

export default OAuth;






//.