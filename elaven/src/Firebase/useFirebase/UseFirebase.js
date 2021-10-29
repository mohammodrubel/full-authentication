import { useState } from "react"
import { getAuth, signInWithPopup, GoogleAuthProvider ,onAuthStateChanged,signOut} from "firebase/auth";
import { useEffect } from "react";
import firebaseInitialize from './../FirebaseInit/FirebaseInit';


firebaseInitialize()
const useFirebase = ()=>{
    const [users,setUsers] = useState([])
    const [error,setError] = useState('')

    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth()

    const singInWithGoogle = ()=>{
        return signInWithPopup(auth,googleProvider)
        // .then((result) => {
        //     console.log(result)
        //     setUsers(result.user)
        // })
        
        .catch(error => {
            setError(error.message)
        })
    }

    const logOut = ()=>{
        signOut(auth)
        .then(()=>{
            setUsers({})
        })
    }

    useEffect(()=>{
        onAuthStateChanged(auth,users =>{
            setUsers(users)
        })
    },[])

    return {
        users,
        error,
        singInWithGoogle,
        logOut
    }





}

export default useFirebase