import { useState } from "react";
import NavigationTop from "../Navigation/TopNav/NavigationTop";
import { auth } from "../../../FirebaseConfig";
import { NavLink, useNavigate } from "react-router-dom";




const Profile = () => {

    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });

    const { name, email } = formData;

    // Retrieves a navigation function for redirecting after logout.
    const afterSignOut = useNavigate();

    const onLogOut = () => {
        auth.signOut();
        afterSignOut("/");
        alert("You Are Successfully Logout");
    }
    return (
        <>
            <section className="profile">
                <NavigationTop />

                <div className="user_info">
                    <div className="user_name">
                        <input defaultValue={name} />
                        <input defaultValue={email} />
                    </div>
                    <div className="user_details y_axis_center">
                        <NavLink to="/CreateList" className="btn add_prop x_y_axis_center">add<br />property</NavLink>
                        <div className="btn log_out x_y_axis_center" onClick={onLogOut}>logout</div>
                    </div>
                </div>

            </section>
        </>
    )
}



export default Profile;