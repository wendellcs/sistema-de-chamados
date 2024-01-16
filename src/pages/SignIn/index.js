import { useState } from 'react';
import { Link } from 'react-router-dom';

import './signIn.css'

import logo from '../../assets/logo.png'

function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt='Logo do sistema de chamados' />
                </div>

                <form id='signIn-form'>
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