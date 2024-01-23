import { useState, createContext, useEffect } from "react";
import { auth, db } from '../services/firebaseConnection'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";


export const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        function loadUser() {
            const storageUser = localStorage.getItem('@ticketsPRO')

            if (storageUser) {
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }
            setLoading(false)
        }

        loadUser()
    }, [])

    async function signIn(email, password) {
        setLoadingAuth(true)
        await signInWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                let uid = value.user.uid

                const docRef = doc(db, 'users', uid)
                const docSnap = await getDoc(docRef)

                const data = {
                    uid: uid,
                    name: docSnap.data().name,
                    email: value.user.email,
                    profilePic: docSnap.data().profilePic
                }

                setUser(data)
                storageUser(data)

                toast.success('Bem-vindo(a) de volta!')
                navigate('/dashboard')
            })
            .catch(err => {
                toast.error('Ops! Algo deu errado...')
                setLoadingAuth(false)
            })
    }


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

    async function logOut() {
        await signOut(auth)
        localStorage.removeItem('@ticketsPRO')
        setUser(null)

        toast.warn('Saindo da conta...')
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                signIn,
                signUp,
                logOut,
                loadingAuth,
                loading
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider