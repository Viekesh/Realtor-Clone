import React, { useEffect, useState } from 'react'
import { auth, database } from '../../FirebaseConfig';
import { NavLink, useNavigate } from 'react-router-dom';
import "./Profile.scss";
import Nav from '../Navigation/Nav';
import { collection, doc, getDoc, orderBy, query, where } from 'firebase/firestore';



const Profile = () => {

  // here we can use useState hook to fetch data from firestore database
  const [listings, setListings] = useState(null);


  const [loading, setLoading] = useState(true);


  const [formData, setFormData] = useState({
    firstname: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });


  const { firstname, email } = formData;


  const afterSignOut = useNavigate();


  const onLogOut = () => {
    auth.signOut();
    afterSignOut("/");
    alert("You Are Successfully Logout");
  }



  useEffect(() => {
    async function fetchUserListings() {

      // first we need to create a reference
      const listingRef = collection(database, "RealtorCloneListing");

      const listingDoc = doc(listingRef, auth.currentUser.uid);

      const querySnap = await getDoc(listingDoc);

      const listings = querySnap.docs.map((doc) => {
        return {
          id: doc.id,
          data: doc.data(),
        };
      });

      setListings(listings);

      setLoading(false);

    }

    fetchUserListings();
  }, [listings]);



  return (
    <>
      <div>
        <Nav />
        <div className="user_info">

          <div className="fullname">
            <input
              type="text"
              value={firstname}
              className="fullname_field"
            />

            <input
              type="email"
              value={email}
            />
          </div>

          <div className="profile_picture">
            <img src="" alt="" />
          </div>

        </div>

        <div className="buttons">
          <button onClick={onLogOut}>sign out</button>
          <button>Change Details</button>
        </div>

      </div>

      <div className="create_list_button" >
        <NavLink to="/CreateList">
          Create List
        </NavLink>
      </div>
    </>
  )
}

export default Profile;





// import React, { useEffect, useState } from 'react'
// import { auth, database } from '../../FirebaseConfig';
// import { NavLink, useNavigate } from 'react-router-dom';
// import "./Profile.scss";
// import Nav from '../Navigation/Nav';
// import { collection, doc, getDoc, orderBy, query, where } from 'firebase/firestore';



// const Profile = () => {

//   // here we can use useState hook to fetch data from firestore database
//   const [listings, setListings] = useState(null);


//   const [loading, setLoading] = useState(true);


//   const [formData, setFormData] = useState({
//     firstname: auth.currentUser.displayName,
//     email: auth.currentUser.email,
//   });


//   const { firstname, email } = formData;


//   const afterSignOut = useNavigate();


//   const onLogOut = () => {
//     auth.signOut();
//     afterSignOut("/");
//     alert("You Are Successfully Logout");
//   }



//   useEffect(() => {
//     async function fetchUserListings() {

//       const listingRef = collection(database, "RealtorCloneListing");

//       const listingDoc = doc(listingRef, auth.currentUser.uid);

//       setListings(listingDoc);

//       const q = query(
//         listingRef,
//         where("useRef", "==", auth.currentUser.uid),
//         orderBy("timestamp", "desc")
//       );

//       const querySnap = await getDoc(q);

//       let listing = [];

//       querySnap.forEach((doc) => {
//         return listing.push({
//           id: doc.id,
//           data: doc.data(),
//         });
//       });

//       setListings(listings);

//       setLoading(false);

//     }

//     fetchUserListings();
//   }, [listings]);



//   return (
//     <>
//       <div>
//         <Nav />
//         <div className="user_info">

//           <div className="fullname">
//             <input
//               type="text"
//               value={firstname}
//               className="fullname_field"
//             />

//             <input
//               type="email"
//               value={email}
//             />
//           </div>

//           <div className="profile_picture">
//             <img src="" alt="" />
//           </div>

//         </div>

//         <div className="buttons">
//           <button onClick={onLogOut}>sign out</button>
//           <button>Change Details</button>
//         </div>

//       </div>

//       <div className="create_list_button" >
//         <NavLink to="/CreateList">
//           Create List
//         </NavLink>
//       </div>
//     </>
//   )
// }

// export default Profile;


