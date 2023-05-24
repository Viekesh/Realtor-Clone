import React, { useState } from 'react';
import "./SignIn.scss";

const SignIn = () => {

  // The initial value of the "useState" hook is an object which is an empty string.
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  // To access the "formData" we need to destructure it, to destructure the form data (email and password) we can add a bracket then assign the form data to the properties of that bracket.
  const { email, password } = formData;



  // The parameter "event" gives us all the information that we are typing in the form
  // Whatever value we input in the input field, these value can be also updated in the useState() hook

  // We use this previous state to keep the previous information (it is used to get the previous data)
  // We have more than one input hence we use event.target.id, because we just say this input id is email or password.

  // We just set the previous state (preState) and just add the new one. Here we have two input one is email and other is password.
  // Instead of getting just sending email, we just target the id of the input element (mention in the html element), if we type in this input and if we type in the input related to the password, then we get password.
  // so we just target id of the html element instead of just name.
  const handleFormData = (event) => {

    console.log(event.target.value);

    setFormData((previousState) => ({

      ...previousState,
      [event.target.id] : event.target.value,

    }))

  }

  return (
    <div className='sign_in'>
      <form className="form register_form x_y_axis_center">
        <input
          type="email"
          id="email"
          value={email}
          className="input_field"
          placeholder="Email"
          onChange={handleFormData}
        />

        <input
          type="password"
          id="password"
          value={password}
          className="input_field"
          placeholder="Password"
          onChange={handleFormData}
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

export default SignIn;