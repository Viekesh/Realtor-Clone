import "./Authenticate.scss";
import { useState } from "react";
import MainHead from "../../CommonModules/Headings/MainHead";
import NavigationTop from "../Navigation/TopNav/NavigationTop";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../FirebaseConfig";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";
import GAuth from "./GAuth";
import Spinner from "../../CommonModules/Spinner/Spinner";



const Authenticate = () => {

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = formData;

    const [showPassword, setShowPassword] = useState(false);

    const handleFormData = (event) => {
        console.log(event.target.value);

        setFormData((previousState) => ({
            ...previousState,
            [event.target.id]: event.target.value,
        }));
    };

    const userNavigateAfterSignIn = useNavigate();


    const eyeVisi = () => {
        setShowPassword((prevState) => !prevState);
    }

    const submitSignInForm = async (event) => {

        event.preventDefault();

        setLoading(true);

        try {

            if (email && password) {
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                setLoading(false);

                if (userCredential.user) {
                    alert("Your Are Successfully Signed In");
                    console.log(userCredential.user);
                    userNavigateAfterSignIn("/Profile");
                }
            }

        } catch (error) {

            alert(error.message);
            console.log(error.message);

        }
    };



    return (
        <>
            <section className="authenticate">
                <NavigationTop />
                <MainHead mainHead="Sign In:" />

                {
                    loading ? <div className="load"><Spinner /></div> : ""
                }

                <div className="auth_elements">

                    <form onSubmit={submitSignInForm}>
                        <div className="form_elements y_axis_center">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                className="input_field"
                                placeholder="Enter Email"
                                onChange={handleFormData}
                            />
                        </div>

                        <div className="for_pass_visi form_elements y_axis_center">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                className="input_field"
                                placeholder="Enter Password"
                                onChange={handleFormData}
                            />

                            {
                                showPassword ?
                                    <AiFillEye
                                        className="eye"
                                        onClick={eyeVisi}
                                    /> :
                                    <AiFillEyeInvisible
                                        className="eye"
                                        onClick={eyeVisi}
                                    />
                            }
                        </div>

                        <div className="form_sub_button x_y_axis_center">
                            <button type="submit" className="x_y_axis_center">submit</button>
                        </div>
                    </form>



                    <div className="auth_child_elements y_axis_center">
                        <p>don't have an account? register here.</p>
                        <NavLink to="/Register" className="register_link child_form_elements x_y_axis_center">
                            <FaUserPlus />
                        </NavLink>
                    </div>

                    <div className="auth_child_elements">
                        <p>sign in with different account.</p>
                        <div className="sign_in_methods y_axis_center">
                            <GAuth />
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}



export default Authenticate;