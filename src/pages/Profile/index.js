import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/auth"
import { FiSettings, FiUpload } from "react-icons/fi"

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

    return (
        <div>
            <Header />
            <div className="content">
                <Title text={'Minha conta'}><FiSettings size={25} /></Title>

                <div className="container">
                    <form className="form-profile">
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

                        <label>Nome:</label>
                        <input type="text" placeholder="Seu nome" value={name} onChange={(e) => { setName(e.target.value) }} />

                        <label>Email:</label>
                        <input type="email" placeholder="Exemplo@examplo.com" disabled={true} value={email} />

                        <button type="submit">Salvar</button>
                    </form>

                </div>
                <div className="container">
                    <button className="logout-btn" onClick={() => { logOut() }}>Sair</button>
                </div>
            </div>
        </div>
    )
}