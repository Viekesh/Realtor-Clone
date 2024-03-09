
import { useState } from "react";
import MainHead from "../../CommonModules/Headings/MainHead";
import NavigationTop from "../Navigation/TopNav/NavigationTop";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../FirebaseConfig";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";



const Authenticate = () => {

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

        try {

            if (email && password) {
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

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
    }
    return (
        <>
            <section className="authenticate">
                <NavigationTop />
                <MainHead mainHead="Sign In:" />

                <div className="sign_in">

                    <form >
                        <div className="form_elements">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                className="input_field"
                                placeholder="Enter Email"
                                onClick={handleFormData}
                            />
                        </div>

                        <div className="for_pass_visi form_elements">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                className="input_field"
                                placeholder="Enter Password"
                                onClick={handleFormData}
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

                        <div className="form_button form_elements">
                            <button type="submit">submit</button>
                        </div>
                    </form>

                    <div className="form_elements y_axis_center">
                        <NavLink className="register_link child_form_elements">register</NavLink>

                        <div className="forgot_pass child_form_elements"></div>
                    </div>
                </div>
            </section>
        </>
    )
}



export default Authenticate;