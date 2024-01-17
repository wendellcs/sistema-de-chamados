import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyC7fvKq8-KNBmtcWEUAV8somZWjDdcT8XA",
    authDomain: "sistema-de-chamados-d21a3.firebaseapp.com",
    projectId: "sistema-de-chamados-d21a3",
    storageBucket: "sistema-de-chamados-d21a3.appspot.com",
    messagingSenderId: "408091997020",
    appId: "1:408091997020:web:ca8ca7b2d20ec633864799",
    measurementId: "G-D1WR9L1KLT"
};


const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

export { auth, db, storage }