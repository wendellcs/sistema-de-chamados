import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/auth"
import { FiSettings, FiUpload } from "react-icons/fi"
import { doc, updateDoc } from "firebase/firestore"
import { db, storage } from "../../services/firebaseConnection"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"


import Header from "../../components/Header"
import Title from "../../components/Title"
import avatarImg from "../../assets/avatar.png"
import './profile.css'
import { toast } from "react-toastify"

export default function Profile() {
    const { user, setUser, storageUser, logOut } = useContext(AuthContext)

    const [profilePicUrl, setProfilePicUrl] = useState(user && user.profilePic)
    const [profileImage, setProfileImage] = useState(null)

    const [name, setName] = useState(user && user.name)
    const [email, setEmail] = useState(user && user.email)

    function handleFile(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0]
            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                setProfileImage(image)
                setProfilePicUrl(URL.createObjectURL(image))
            } else {
                toast.error('Formatos aceitos: png e jpeg')
            }
        }
    }

    async function handleUpload() {
        const currentUid = user.uid
        const uploadRef = ref(storage, `images/${currentUid}/${profileImage.name}`)

        const uploadTask = uploadBytes(uploadRef, profileImage)
            .then((snapshot) => {

                getDownloadURL(snapshot.ref)
                    .then(async (downloadURL) => {
                        let urlPhoto = downloadURL

                        const docRef = doc(db, 'users', user.uid)

                        await updateDoc(docRef, {
                            profilePic: urlPhoto,
                            name: name
                        })
                            .then(() => {
                                let data = {
                                    ...user,
                                    name: name,
                                    profilePic: urlPhoto
                                }

                                setUser(data)
                                storageUser(data)
                                toast.success('Foto enviada!')
                            })
                    })

            })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (!profileImage && name !== '') {
            const docRef = doc(db, 'users', user.uid)

            await updateDoc(docRef, {
                name: name,
            })
                .then(() => {
                    let data = {
                        ...user,
                        name: name
                    }

                    setUser(data)
                    storageUser(data)

                    toast.success('Nome atualizado!')
                })
        } else if (name !== '' && profileImage) {
            handleUpload()
        }
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title text={'Minha conta'}><FiSettings size={25} /></Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleSubmit}>
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#fff" size={40} />
                            </span>
                            <input type="file" accept="image/*" onChange={handleFile} /><br />
                            {!profilePicUrl ?
                                (<img src={avatarImg} alt="Foto de perfil" width={250} height={250} />)
                                :
                                (<img src={profilePicUrl} alt="Foto do perfil" width={250} height={250} />)}
                        </label>

                        <div>

                            <label>Nome:</label>
                            <input type="text" placeholder="Seu nome" value={name} onChange={(e) => { setName(e.target.value) }} />

                            <label>Email:</label>
                            <input type="email" placeholder="Exemplo@examplo.com" disabled={true} value={email} />

                            <button type="submit">Salvar</button>
                        </div>
                    </form>

                </div>
                <div className="container">
                    <button className="logout-btn" onClick={() => { logOut() }}>Sair</button>
                </div>
            </div>
        </div>
    )
}