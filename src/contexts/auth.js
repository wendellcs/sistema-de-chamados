import { useState, createContext, useEffect } from "react";
import { auth, db } from '../services/firebaseConnection'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";


export const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)

    function signIn(email, password) {
        console.log(email)
        console.log(password)
    }

    const navigate = useNavigate()

    async function signUp(name, email, password) {
        setLoadingAuth(true)
        if (name && email && password) {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(async (value) => {
                    let uid = value.user.uid

                    await setDoc(doc(db, "users", uid), {
                        name: name,
                        profilePic: null,
                    })
                        .then(() => {
                            const data = {
                                uid: uid,
                                name: name,
                                email: value.user.email,
                                profilePic: null
                            }

                            setUser(data)
                            storageUser(data)

                            setLoadingAuth(false)
                            toast.success('Seja bem-vindo!')
                            navigate('/dashboard')

                        })
                })
                .catch(err => {
                    setLoadingAuth(false)
                })
        }
    }

    function storageUser(data) {
        localStorage.setItem('@ticketsPRO', JSON.stringify(data))
    }

    if (loadingAuth) {

    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user, // False
                user,
                signIn,
                signUp,
                loadingAuth
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider