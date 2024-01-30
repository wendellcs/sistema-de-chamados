import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/auth"
import { FiSettings, FiUpload } from "react-icons/fi"

import Header from "../../components/Header"
import Title from "../../components/Title"
import avatarImg from "../../assets/avatar.png"
import './profile.css'

export default function Profile() {
    const { user } = useContext(AuthContext)

    const [profilePic, setProfilePic] = useState(user && user.profilePic)

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
                            <input type="file" accept="image/*" /><br />
                            {!profilePic ?
                                (<img src={avatarImg} alt="Foto de perfil" width={250} height={250} />)
                                :
                                (<img src={profilePic} alt="Foto do perfil" width={250} height={250} />)}
                        </label>

                        <label>Nome:</label>
                        <input type="text" placeholder="Seu nome" />

                        <label>Email:</label>
                        <input type="email" placeholder="Exemplo@examplo.com" disabled={true} />

                        <button type="submit">Salvar</button>
                    </form>

                </div>
                <div className="container">
                    <button className="logout-btn">Sair</button>
                </div>
            </div>
        </div>
    )
}