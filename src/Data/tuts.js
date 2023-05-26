// // create user with email and password by using firebase

// import React, { useState, useEffect } from "react";
// import { firebase } from "firebase/app";
// import { auth } from "firebase/auth";

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const user = await auth.createUserWithEmailAndPassword(email, password);
//       setError("");
//       // Redirect to the home page after the user is created.
//       window.location.href = "/";
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Sign Up</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="email" placeholder="Email" value={email} onChange={setEmail} />
//         <input type="password" placeholder="Password" value={password} onChange={setPassword} />
//         <button type="submit">Sign Up</button>
//       </form>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default Signup;
