import { useEffect, useState } from "react"
import { auth } from "../../../../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";




const CheckAuthStatus = () => {

    const [loggedIn, setLoggedIn] = useState(false);

    const [checkingStatus, setCheckingStatus] = useState(true);

    useEffect(() => {
        const authenticate = auth;

        onAuthStateChanged(authenticate, (user) => {
            if (user) {
                setLoggedIn(true);
            };

            setCheckingStatus(false);
        });
    }, []);

    return [loggedIn, checkingStatus];
};



export default CheckAuthStatus;