import React from 'react';
import "./OAuth.scss";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { auth, database } from '../../FirebaseConfig';
import { GoogleAuthProvider, getRedirectResult, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';






const OAuth = () => {

    const navigateAfterSignInWithGoogle = useNavigate();

    const onGoogleClick = async () => {

        try {

            const authenticate = auth;

            const provider = new GoogleAuthProvider();

            const result = await signInWithPopup(authenticate, provider);

            const user = result.user;
            console.log(user);

            // first here we check the user is available or not
            // so we need to create a reference for it, because we need to have the address or the users unique id
            // for this we need to compare already registered users uid in our database/collection to the current one
            // here we create a reference for storing the address,
            // we can add the address using "doc" method provided by "firebase/firestore"
            const docRef = doc(database, "realtorsCloneUsers", user.uid);

            // so this is going to return a promise (we can call it a snapshot)
            // so now we get all the information in "docSnap" with the help of "getDoc" provided by firebase/firestore
            // this is going to check all the documents with the "UID" which is user is using while "continue with google"
            // and if its available we get it inside the "docSnap"
            const docSnap = await getDoc(docRef);

            // now we check the "uid" is available or not, if it doesn't exist in "docSnap", so we're going add it to the database
            if (!docSnap.exists()) {

                // for adding we use "setDoc" method provided by firebase/firestore
                // "setDoc" is going to get address as well, which is the same address we have here (these address which is hold by a "docRef")
                await setDoc(docRef, {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp(),
                });

                alert("Registered Successfully");
                navigateAfterSignInWithGoogle("/");
            }
        } catch (error) {
            alert(error.message);
            console.log("sign in unsuccesful", error.message);
        }
    }



    // const onGoogleClickOnAndi = async () => {
    //     try {
    //         const authenticate = auth;
    //         const provider = new GoogleAuthProvider();
    //         // const result = await signInWithRedirect(authenticate, provider);
    //         const res = await getRedirectResult(authenticate, provider);
    //         // const user = result.user;
    //         const user = res.user
    //         console.log(user);

    //         const docRef = doc(database, "realtorsCloneUsers", user.uid);

    //         const docSnap = await getDoc(docRef);

    //         if (!docSnap.exists()) {
    //             await setDoc(docRef, {
    //                 name: user.displayName,
    //                 email: user.email,
    //                 timeStamp: serverTimestamp(),
    //             });
    //         }

    //         console.log(user);
    //         alert("Registered Successfully");
    //         navigateAfterSignInWithGoogle("/");

    //     } catch (error) {
    //         console.log(error.message);
    //         console.log(error.code);
    //     }
    // };

    return (
        <>
            <div className="oauth for_android">
                <button type="button" onClick={onGoogleClick}>
                    <FcGoogle className="oauth_icon" />
                    &nbsp; Continue With Google
                </button>
            </div>
            <div className="oauth for_desktop">
                <button type="button">
                    <FcGoogle className="oauth_icon" />
                    &nbsp; Continue With Google
                </button>
            </div>
        </>
    )
}

export default OAuth;






//.