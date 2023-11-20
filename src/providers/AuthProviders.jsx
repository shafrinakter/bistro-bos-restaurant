import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth";


export const AuthContext = createContext(null)

const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    // create user
    const createUser =async (email, password) => {
        setLoading(true)
        const result= await createUserWithEmailAndPassword(auth, email, password);
        return result

    }

    // update profile
    const updateUser = (name,photo)=>{
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
          })
    }

    // login
    const logIn = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    // google
    const googleSingIn = ()=>{
        setLoading(true)
        const provider = new GoogleAuthProvider()
        return signInWithPopup (auth, provider)
    }


    // singOut
    const logOut = ()=>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {

            setUser(currentUser);
            console.log('current user', currentUser);
            setLoading(false)
        })
        return () => {
            return unSubscribe();
        }
    }, [])
    const authIfno = {
        user,
        loading,
        createUser,
        logIn,
        googleSingIn,
        logOut,
        updateUser

    }
    return (
        <AuthContext.Provider value={authIfno}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;