import { GoogleAuthProvider, getRedirectResult, signInWithRedirect } from "firebase/auth";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth, database } from "../../../FirebaseConfig";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";




const GAuth = () => {

    const navigateAfterSignInWithGoogle = useNavigate();

    const provider = new GoogleAuthProvider();

    const authInitialise = auth;

    const [user, setUser] = useState(null);

    const [error, setError] = useState(null);

    useEffect(() => {

        const handleRedirectResult = async () => {

            try {


                const result = await getRedirectResult(authInitialise);

                const { userOfGetRedRes } = result;

                setUser(userOfGetRedRes);

            } catch (error) {

                setError(error);

            }

        }

        handleRedirectResult();

    }, [authInitialise]);



    const handleGoogleSignIn = async () => {

        try {

            const result = await signInWithRedirect(authInitialise, provider);

            const user = result.user;

            alert("User signed in:", user);

            const docRef = doc(database, "ApplicationUsers", user.uid);

            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp(),
                });

                console.log("New user registered in database");
            };

            navigateAfterSignInWithGoogle("/Profile"); // Redirect after successful sign-in

        } catch (error) {

            alert(error.message); // More user-friendly error message
            console.log(error.message);

        }
    };

    return (
        <>
            <section className="g_auth x_y_axis_center" onClick={handleGoogleSignIn}>
                <div className="for_andi x_y_axis_center">
                    <FcGoogle />
                </div>
            </section>
        </>
    )
}



export default GAuth;