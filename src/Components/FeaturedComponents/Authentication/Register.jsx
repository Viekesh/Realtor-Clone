import "./Authenticate.scss";
import { useState } from "react";
import MainHead from "../../CommonModules/Headings/MainHead";
import NavigationTop from "../Navigation/TopNav/NavigationTop";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, database } from "../../../FirebaseConfig";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";



const Register = () => {

    const [formData, setShowFormData] = useState({
        firstname: "",
        lastname: "",
        mobileNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { firstname, lastname, mobileNumber, email, password, confirmPassword } = formData;

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleFormData = (event) => {
        console.log(event.target.value);

        setShowFormData((prevState) => ({
            ...prevState,

            [event.target.id]: event.target.value,
        }));
    };

    const userNavigateAfterSignUp = useNavigate();

    const eyeVisi = () => {
        setShowPassword((prevState) => !prevState);
    };

    const eyeConVisi = () => {
        setShowConfirmPassword((prevState) => !prevState);
    };

    const submitFormData = async (event) => {
        event.preventDefault();

        try {

            if (password !== confirmPassword) {
                return alert("Password Not Matched");
            };

            if (firstname, lastname, mobileNumber, email, password, confirmPassword) {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                await updateProfile(auth.currentUser, {
                    displayName: `${firstname} ${lastname}`
                });

                const user = userCredential.user;

                const formDataCopy = { ...formData };

                delete formDataCopy.password;

                delete formDataCopy.confirmPassword;

                formDataCopy.timeStamp = serverTimestamp();

                await setDoc(doc(database, "ApplicationUsers", user.uid), {
                    ...formDataCopy,
                });

                alert("You Have Successfully Registered!");

                userNavigateAfterSignUp("/Authenticate");
            } else {
                return alert("All Fields Are Mandatory");
            }

        } catch (error) {
            alert(error.message);
            console.log(error.message);
        };
    };



    return (
        <>
            <section className="authenticate">
                <NavigationTop />
                <MainHead mainHead="Register:" />

                <div className="auth_elements">

                    <form onSubmit={submitFormData}>
                        <div className="form_elements y_axis_center">
                            <input
                                type="text"
                                id="firstname"
                                value={firstname}

                                className="input_field"
                                placeholder="Enter Firstname"
                                onChange={handleFormData}
                            />
                        </div>

                        <div className="form_elements y_axis_center">
                            <input
                                type="text"
                                id="lastname"
                                value={lastname}

                                className="input_field"
                                placeholder="Enter Lastname"
                                onChange={handleFormData}
                            />
                        </div>

                        <div className="form_elements y_axis_center">
                            <input
                                type="number"
                                id="mobileNumber"
                                value={mobileNumber}

                                className="input_field"
                                placeholder="Enter Mobile Number"
                                onChange={handleFormData}
                            />
                        </div>

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

                        <div className="form_elements y_axis_center">
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

                        <div className="form_elements y_axis_center">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                value={confirmPassword}

                                className="input_field"
                                placeholder="Confirm Password"
                                onChange={handleFormData}
                            />

                            {
                                showConfirmPassword ?
                                    <AiFillEye
                                        className="eye"
                                        onClick={eyeConVisi}
                                    /> :
                                    <AiFillEyeInvisible
                                        className="eye"
                                        onClick={eyeConVisi}
                                    />
                            }
                        </div>

                        <div className="form_elements form_sub_button">
                            <button type="submit" className="input_field">Register</button>
                        </div>
                    </form>


                </div>
            </section>
        </>
    )
}



export default Register;