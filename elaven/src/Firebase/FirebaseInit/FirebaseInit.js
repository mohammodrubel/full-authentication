import { initializeApp } from "firebase/app";
import firebaseConfig from './../FirebaseConfig/FirebaseConfig';

const firebaseInitialize = ()=>{
    initializeApp(firebaseConfig);
}

export default firebaseInitialize