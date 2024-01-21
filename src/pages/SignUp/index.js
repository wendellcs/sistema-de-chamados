import { useState } from "react";
import { Link } from "react-router-dom";
import logo from './../../assets/logo.png'


function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        if (name && email && password) {
            alert('cadastro')
        }
    }

    return (
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt='Logo do sistema de chamados' />
                </div>

                <form id='form' onSubmit={handleSubmit}>
                    <h1>Nova conta</h1>
                    <input type='text'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => { setName(e.target.value); }}
                    />
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

                    <button type='submit'>Cadastrar</button>
                </form>

                <Link to='/'>Já possui uma conta? Faça login</Link>

            </div>
        </div>
    )
}

export default SignUp;