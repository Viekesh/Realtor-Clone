import { FcGoogle } from "react-icons/fc";
import { auth, database } from "../../../FirebaseConfig";
import { GoogleAuthProvider, getRedirectResult, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



const GAuth = () => {

    const navigateAfterSignInWithGoogle = useNavigate();

    const onGoogleClick = async () => {

        try {

            const authInitialise = auth;

            const authProvider = new GoogleAuthProvider();

            const result = await signInWithPopup(authInitialise, authProvider);

            authProvider.addScope("Profile");

            authProvider.addScope("Email");

            const user = result.user;

            console.log(user);

            const docRef = doc(database, "ApplicationUsers", user.uid);

            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp(),
                });
            };

            alert("Registered Successfully");

            navigateAfterSignInWithGoogle("/Profile");

        } catch (error) {

            alert(error.message);
            console.log("sign in unsuccesful", error.message);

        }
    }



    // const onGoogleClickWithRedirect = async () => {

    //     try {

    //         const authInitialise = auth;

    //         const authProvider = new GoogleAuthProvider();

    //         const result = await signInWithRedirect(authInitialise, authProvider).then((result) => {
    //             console.log(result);
    //         })

    //         authProvider.addScope("Profile");

    //         authProvider.addScope("Email");

    //         const user = result.user;

    //         console.log(user);

    //         const docRef = doc(database, "ApplicationUsers", user.uid);

    //         const docSnap = await getDoc(docRef);

    //         if (!docSnap.exists()) {
    //             await setDoc(docRef, {
    //                 name: user.displayName,
    //                 email: user.email,
    //                 timestamp: serverTimestamp(),
    //             });
    //         };

    //         alert("Registered Successfully");

    //         navigateAfterSignInWithGoogle("/Profile");

    //     } catch (error) {

    //         alert(error.message);
    //         console.log("sign in unsuccesful", error.message);

    //     }
    // };

    // const onGoogleClickWithRedirect = async (event) => {

    //     event.preventDefault();

    //     try {
    //         const provider = new GoogleAuthProvider();
    //         provider.addScope("profile"); // Request profile information
    //         provider.addScope("email"); // Request email address

    //         const authInitialise = auth;

    //         const result = await signInWithRedirect(authInitialise, provider);

    //         const user = result.user;

    //         alert("User signed in:", user);

    //         const docRef = doc(database, "ApplicationUsers", user.uid);

    //         const docSnap = await getDoc(docRef);

    //         if (!docSnap.exists()) {
    //             await setDoc(docRef, {
    //                 name: user.displayName,
    //                 email: user.email,
    //                 timestamp: serverTimestamp(),
    //             });

    //             console.log("New user registered in database");
    //         }

    //         navigateAfterSignInWithGoogle("/Profile"); // Redirect after successful sign-in

    //     } catch (error) {

    //         alert(error.message); // More user-friendly error message
    //         console.error("Error signing in:", error.message);

    //     }
    // };

    return (
        <>
            {/* <div className="g_auth desktop">
                <button type="button" onClick={onGoogleClick}>
                    <FcGoogle className="oauth_icon" />
                </button>
            </div> */}

            <div className="g_auth" onClick={onGoogleClick}>
                <FcGoogle />
            </div>
        </>
    )
}



export default GAuth;