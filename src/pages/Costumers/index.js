import Header from '../../components/Header'
import Title from '../../components/Title'
import { useState } from 'react'
import { FiUser } from 'react-icons/fi'
import { db } from '../../services/firebaseConnection'
import { addDoc, collection } from 'firebase/firestore'
import { toast } from 'react-toastify'

export default function Costumers() {
    const [nome, setNome] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [endereco, setEndereco] = useState('')

    async function handleRegister(e) {
        e.preventDefault()

        if (nome && cnpj && endereco) {
            await addDoc(collection(db, 'costumers'), {
                nomeFantasia: nome,
                cnpj: cnpj,
                endereco: endereco
            })
                .then(() => {
                    setCnpj('')
                    setNome('')
                    setEndereco('')
                    toast.success('Empresa registrada com sucesso!')
                })
                .catch(() => {
                    toast.error('Erro ao fazer cadastro.')
                })
        } else {
            toast.error('Há algum campo vazio...')
        }

    }

    return (
        <div>
            <Header />

            <div className='content'>
                <Title name='clientes'>
                    <FiUser size={25} />
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={handleRegister}>
                        <label>Nome fantasia:</label>
                        <input type='text'
                            placeholder='Nome da empresa'
                            value={nome}
                            onChange={(e) => { setNome(e.target.value) }}
                        />
                        <label>CNPJ:</label>
                        <input type='text'
                            placeholder='Digite o CNPJ'
                            value={cnpj}
                            onChange={(e) => { setCnpj(e.target.value) }}
                        />
                        <label>Nome fantasia:</label>
                        <input type='text'
                            placeholder='Endereço da empresa'
                            value={endereco}
                            onChange={(e) => { setEndereco(e.target.value) }}
                        />

                        <button type='sumbit'>Salvar</button>

                    </form>
                </div>
            </div>

        </div>
    )
}