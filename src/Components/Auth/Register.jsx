import React, { useState } from 'react';
import "./Register.scss";
import Nav from '../Navigation/Nav';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';



// Imports functions for creating users and updating profiles in Firebase Authentication.
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

// Imports functions for interacting with Firestore, a database.
import { auth, database } from '../../FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
// import { doc, serverTimestamp, setDoc } from "firebase/firestore";



const Register = () => {

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        mobileNumber: "",
        email: "",
        password: "",
        confirmPass: ""
    });

    const { firstname, lastname, mobileNumber, email, password, confirmPass } = formData;



    const [showPass, setShowPass] = useState(false);



    const [showConfirmPass, setShowConfirmPass] = useState(false);



    // Updates form data based on user input.
    const handleFormData = (event) => {
        console.log(event.target.value);

        setFormData((previousState) => ({
            ...previousState,

            [event.target.id]: event.target.value
        }))
    }



    const userNavigateaftersignup = useNavigate();



    // Handles form submission, including Password validation 
    // Firebase Authentication
    // User profile creation
    // Firestore data storage
    // Redirection upon success
    const submitFormData = async (event) => {

        event.preventDefault();

        try {

            if (password !== confirmPass) {
                return alert("Password Not Matched");
            }

            if (firstname && lastname && mobileNumber && email && password && confirmPass) {

                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                )


                await updateProfile(auth.currentUser, {
                    displayName: `${firstname} ${lastname}`
                })


                const user = userCredential.user;


                const formDataCopy = { ...formData };


                delete formDataCopy.password;


                delete formDataCopy.confirmPass;


                // formDataCopy.timeStamp = serverTimestamp();


                await setDoc(doc(database, "realtorsCloneUsers", user.uid), {
                    ...formDataCopy,
                });


                alert("Registration Successful");


                userNavigateaftersignup("/");
            } else {
                return alert("All Fields Are Mandatory");
            }
        } catch (error) {
            console.log(error.message);
            alert("There is some error while signup the form");
        }
    }

    return (
        <>
            <Nav />
            <div className='register'>
                <form onSubmit={submitFormData}>
                    <input
                        type="text"
                        id="firstname"
                        value={firstname}

                        className="input_field"
                        placeholder="Firstname"
                        onChange={handleFormData}
                    />

                    <input
                        type="text"
                        id="lastname"
                        value={lastname}
                        className="input_field"
                        placeholder="Lastname"
                        onChange={handleFormData}
                    />

                    <input
                        type="number"
                        id="mobileNumber"
                        value={mobileNumber}
                        className="input_field"
                        placeholder="Mobile Number"
                        onChange={handleFormData}
                    />

                    <input
                        type="email"
                        id="email"
                        value={email}
                        className="input_field"
                        placeholder="Email"
                        onChange={handleFormData}
                    />

                    <div className='for_pass_visi'>
                        <input
                            type={showPass ? "text" : "password"}
                            id="password"
                            value={password}
                            className="input_field"
                            placeholder="Password"
                            onChange={handleFormData}
                        />

                        {showPass ?
                            (
                                <AiFillEye
                                    className="reg_eye_invisible"
                                    onClick={() => setShowPass((prevState) => !prevState)}
                                />
                            )
                            :
                            (
                                <AiFillEyeInvisible
                                    className="reg_eye_invisible"
                                    onClick={() => setShowPass((prevState) => !prevState)}
                                />
                            )}
                    </div>

                    <div className='for_pass_visi'>
                        <input
                            type={showConfirmPass ? "text" : "password"}
                            id="confirmPass"
                            value={confirmPass}
                            className="input_field"
                            placeholder="Confirm Password"
                            onChange={handleFormData}
                        />

                        {showConfirmPass ?
                            (
                                <AiFillEye
                                    className="reg_eye_invisible"
                                    onClick={() => setShowConfirmPass((prevState) => !prevState)}
                                />
                            )
                            :
                            (
                                <AiFillEyeInvisible
                                    className="reg_eye_invisible"
                                    onClick={() => setShowConfirmPass((prevState) => !prevState)}
                                />
                            )}
                    </div>

                    <div className="form_buttons">
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register;


