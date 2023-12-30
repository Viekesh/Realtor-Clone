import React, { useEffect, useState } from 'react';
import "./Profile.scss";
import Nav from '../Navigation/Nav';


// Imports Firebase configuration for authentication and database access.
import { auth, database } from '../../FirebaseConfig';

// Imports navigation components and a hook from React Router for routing and navigation between pages.
import { NavLink, useNavigate } from 'react-router-dom';

// Imports Firestore-related functions for interacting with the Firebase Firestore database.
import { collection, doc, getDocs, orderBy, query, where } from 'firebase/firestore';






const Profile = () => {

    // Uses the useState hook to create a state variable formData to store user's profile information (first name 
    // and email). Initializes formData with the current user's details from Firebase Authentication.
    const [formData, setFormData] = useState({
        firstname: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });


    // Destructures firstname and email from formData for convenient access.
    const { firstname, email } = formData;


    // Retrieves a navigation function for redirecting after logout.
    const afterSignOut = useNavigate();

    // Defines a function for handling logout
    const onLogOut = () => {

        // Signs the user out of Firebase Authentication.
        auth.signOut();
        afterSignOut("/");
        alert("You Are Successfully Logout");
    }


    // here we use useState for storing fetched listings.
    const [listings, setListings] = useState(null);

    // Tracks loading state for data fetching.
    const [loading, setLoading] = useState(true);



    // Uses the useEffect hook to fetch listings when the component mounts or the user ID changes.
    useEffect(() => {


        // Defines an asynchronous function to fetch listings from Firestore: Constructs a query for listings 
        // where the useRef field matches the current user's ID, ordered by timestamp. Fetches documents using 
        // getDocs. Processes fetched documents, storing their IDs and data in an array. Updates the listings 
        // state with the fetched data. Sets loading to false to indicate data fetching is complete.
        async function fetchUserListings() {

            const listingRef = collection(database, "RealtorCloneListing");

            // const listingDoc = doc(listingRef, auth.currentUser.uid).ref;

            // setListings(listingDoc);

            const qr = query(
                listingRef,
                where("useRef", "==", auth.currentUser.uid),
                orderBy("timestamp", "desc")
            );

            const querySnap = await getDocs(qr);

            let listing = [];

            querySnap.forEach((doc) => {
                return listing.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });

            setListings(listing);

            setLoading(false);

        }

        // Calls the fetchUserListings function to initiate data fetching.
        fetchUserListings();
    }, [auth.currentUser.uid]);



    return (
        <>
            <div>
                <Nav />

                <div className="user_info">
                    <div className="fullname">
                        <input
                            type="text"
                            defaultValue={firstname}
                            className="fullname_field"
                        />

                        <input
                            type="email"
                            defaultValue={email}
                        />
                    </div>

                    <div className="profile_picture">
                        <img src="" alt="" />
                    </div>
                </div>

                <div className="buttons">
                    <button onClick={onLogOut}>sign out</button>
                    <button>Edit Details</button>
                </div>

            </div>

            <div className="create_list_button" >
                <NavLink to="/CreateList">
                    Create List
                </NavLink>
            </div>

            <div>
                {
                    !loading && listings.length > 0 && (
                        <>
                            <h2>My Listing</h2>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default Profile;