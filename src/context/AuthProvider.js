import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../firebase/Firebase.config'; 

export const AuthContext = createContext();
const auth = getAuth(app)



const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); //!observer set user state.
const [loading,setLoading]=useState(true); //!private route - true means ..initial start is loading.


// !====================================
// *create user with email and password
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
// *----------------------------------\\




    // !====================================
    // *Login with email and password after registration
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    // *----------------------------------\\




    // !====================================
    // *Logout
    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }
    // *----------------------------------\\




    // !====================================
    // *Update user profile -name ,photo url
    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    }
    // *----------------------------------\\




    // !====================================
    // *Observer Functions - user is signed or not signed.
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('user observing');
            setUser(currentUser);
            setLoading(false);//! user is set then stop loading.
        });

        return () => unsubscribe();
    }, [])
   // *----------------------------------\\





    // !====================================
    // *Google signup
    const providerLogin = (provider) => {
        return signInWithPopup(auth, provider);
    }





    const authInfo = {
        createUser,
        signIn,
        logOut,
        user,
        updateUser,
        loading,
        providerLogin
    }





    return (
        <AuthContext.Provider
            value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;