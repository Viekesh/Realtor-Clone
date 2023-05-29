import React, { useState } from 'react';
import "./SignIn.scss";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../FirebaseConfig';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;



  const [showPassword, setShowPassword] = useState(false);



  const handleFormData = (event) => {

    console.log(event.target.value);

    setFormData((previousState) => ({
      ...previousState,
      [event.target.id]: event.target.value,
    }))
  }



  const userNavigateAfterSignIn = useNavigate();


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
          alert("You Are Successfully SignIn");
          console.log(userCredential.user);
          userNavigateAfterSignIn("/");
        }
      }
    } catch(error) {
      console.log(error.message);
      alert(error.message);
    }
  }



  return (
    <div className='sign_in'>
      <form className='x_y_axis_center' onSubmit={submitSignInForm}>
        <input
          type="email"
          id="email"
          value={email}
          className="input_field"
          placeholder="Email"
          onChange={handleFormData}
        />

        <div className='forPassVisi'>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            className="input_field"
            placeholder="Password"
            onChange={handleFormData}
          />

          {showPassword ?
            (
              <AiFillEye
                className="eye_invisible"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            )
            :
            (
              <AiFillEyeInvisible
                className="eye_invisible"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            )}
        </div>

        <div className="form_buttons">
          <button type="submit">SignIn</button>
        </div>

      </form>
    </div>
  )
}

export default SignIn;


