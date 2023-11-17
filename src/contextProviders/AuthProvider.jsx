import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    // signUP 
    const createUser = (email, password) => {
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // signIN 
    const logIn = (email, password) => {
        setLoader(true);
        return signInWithEmailAndPassword(email, password);
    }

    // signOUT 
    const logOut = () => {
        setLoader(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log(currentUser);
            setLoader(false);
        });
        return () => {
            return unsubscribe()
        };
    }, []);

    const authInfo = {
        user,
        loader,
        createUser,
        logIn,
        logOut,

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;