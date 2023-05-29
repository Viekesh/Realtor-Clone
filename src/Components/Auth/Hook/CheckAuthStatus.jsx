import { useEffect } from 'react';
import { useState } from 'react';
import { auth } from '../../../FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export const CheckAuthStatus = () => {

    const [loggedIn, setLoggedIn] = useState(false);

    const [checkingStatus, setCheckingStatus] = useState(true);



    useEffect(() => {
        const authenticate = auth;

        onAuthStateChanged(authenticate, (user) => {
            if(user) {
                setLoggedIn(true);
            }
            setCheckingStatus(false);
        });
    }, []);
  return [loggedIn, checkingStatus];
}




// source : https://stackoverflow.com/questions/71090914/uncaught-typeerror-object-is-not-iterable-cannot-read-property-symbolsymbol-i
// one problem can be occured in this component and now it is solved by using above link

// the problem is that I have type this code : "return {loggedIn, checkingStatus};" and getting an error called "object not iterable".
// now I have write "return [loggedIn, checkingStatus];" now application is worked perfectly. To know more use above link.


