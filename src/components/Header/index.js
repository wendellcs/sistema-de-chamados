import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { Link } from 'react-router-dom'
import { FiHome, FiUser, FiSettings } from 'react-icons/fi'

import avatarImg from './../../assets/avatar.png'
import './header.css'

export default function Header() {
    const { user } = useContext(AuthContext)

    return (
        <header className="sidebar">
            <div>
                <img src={!user.avatarUrl ? avatarImg : user.avatarUrl} alt='Foto do usuário' />
            </div>

            <Link to='/dashboard'>
                <FiHome color='#FFF' size={24} />
                Chamados
            </Link>
            <Link to='/costumers'>
                <FiUser color='#FFF' size={24} />
                Clientes
            </Link>
            <Link to='/profile'>
                <FiSettings color='#FFF' size={24} />
                Perfil
            </Link>
        </header>
    )
}