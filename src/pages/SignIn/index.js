import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

import './signIn.css'
import logo from '../../assets/logo.png'

function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signIn } = useContext(AuthContext)

    function handleSignIn(e) {
        e.preventDefault()

        if (email && password) {
            // Mostrar um popup com mensagem de sucesso.
            signIn(email, password)
        } else {
            // Mostrar um popup falando que falta algo.
        }
    }

    return (
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt='Logo do sistema de chamados' />
                </div>

                <form id='form' onSubmit={handleSignIn}>
                    <h1>Entrar</h1>
                    <input type='text'
                        placeholder='email@email.com'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); }}
                    />
                    <input type='password'
                        placeholder='********'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); }}
                    />

                    <button type='submit'>Acessar</button>
                </form>

                <Link to='/register'>Criar uma conta</Link>

            </div>
        </div>
    )
}

export default SignIn;