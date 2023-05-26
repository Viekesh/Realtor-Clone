import React, { useState } from 'react';
import "./SignIn.scss";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

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

  

  return (
    <div className='sign_in'>
      <form className='x_y_axis_center'>
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


