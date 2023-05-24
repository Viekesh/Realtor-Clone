import React from 'react';
import "./Register.scss";

const Register = () => {
  return (
    <div className='register'>
      <form className="form register_form x_y_axis_center">
        <input
          type="text"
          className="input_field"
          id="firstname"
          placeholder="Firstname"
        />

        <input
          type="text"
          className="input_field"
          id="firstname"
          placeholder="Lastname"
        />

        <input
          type="number"
          className="input_field"
          id="mobileNumber"
          placeholder="Mobile Number"
        />

        <input
          type="email"
          className="input_field"
          id="email"
          placeholder="Email"
        />

        <input
          type="password"
          className="input_field"
          id="password"
          placeholder="Password"
        />

        <input
          type="password"
          className="input_field"
          id="confirmPass"
          placeholder="Confirm Password"
        />

        <input
          type="submit"
          className="input_field button"
          id="submit"
        />
      </form>
    </div>
  )
}

export default Register;


