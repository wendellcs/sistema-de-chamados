import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { FiPlusCircle } from 'react-icons/fi'
import { db } from '../../services/firebaseConnection'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore'

import Header from '../../components/Header'
import Title from '../../components/Title'
import './new.css'
import { toast } from 'react-toastify'


export default function New() {
    const { user } = useContext(AuthContext)

    const [costumers, setCostumers] = useState([])
    const [loadCostumers, setLoadCostumers] = useState(true)
    const [costumerSelected, setCostumerSelected] = useState(0)

    const [complemento, setComplemento] = useState('')
    const [assunto, setAssunto] = useState('suporte')
    const [status, setStatus] = useState('aberto')

    function handleChangeSelect(e) {
        setAssunto(e.target.value)
    }

    function handleOptionChange(e) {
        setStatus(e.target.value)
    }

    function handleChangeCostumer(e) {
        setCostumerSelected(e.target.value)
    }

    useEffect(() => {
        async function loadCostumers() {
            const querySnapshot = await getDocs(collection(db, 'costumers'))
                .then((snapshot) => {
                    let lista = []
                    snapshot.forEach(doc => {
                        lista.push({
                            Id: doc.id,
                            nomeFantasia: doc.data().nomeFantasia
                        })
                    })

                    if (snapshot.docs.size == 0) {
                        setCostumers([{ id: 1, nomeFantasia: 'FREELA' }])
                        toast.error('Nenhuma empresa econtrada...')
                        setLoadCostumers(false)
                        return
                    }

                    setCostumers(lista)
                    setLoadCostumers(false)
                })
                .catch(() => {
                    toast.error('Erro ao buscar clientes')
                    setCostumers([{ id: 1, nomeFantasia: 'FREELA' }])
                    setLoadCostumers(false)
                })
        }
        loadCostumers()
    }, [])

    return (
        <div>
            <Header />

            <div className='content'>
                <Title text='Novo chamado'>
                    <FiPlusCircle size={25} />
                </Title>

                <div className='container'>
                    <form className='form-profile'>
                        <label for='clientes'>Clientes</label>
                        {
                            loadCostumers ? (
                                <input type='text' disabled={true} value={'Carregando...'} />
                            ) : (
                                <select value={costumerSelected} onChange={handleChangeCostumer}>
                                    {
                                        costumers.map(item => {
                                            return (
                                                <option key={item.index} value={item.index}>{item.nomeFantasia}</option>
                                            )
                                        })
                                    }
                                </select>

                            )
                        }

                        <label for='assunto'>Assunto</label>
                        <select id='assunto' value={assunto} onChange={handleChangeSelect}>
                            <option value='suporte'>Suporte</option>
                            <option value='visita_tecnica'>Visita Tecnica</option>
                            <option value='financeiro'>Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className='status'>
                            <div>
                                <input type='radio' name='radio' value='aberto' onChange={handleOptionChange} checked={status === 'aberto'} />
                                <span>Em aberto</span>
                            </div>
                            <div>
                                <input type='radio' name='radio' value='progresso' onChange={handleOptionChange} checked={status === 'progresso'} />
                                <span>Em progresso</span>
                            </div>
                            <div>
                                <input type='radio' name='radio' value='atendido' onChange={handleOptionChange} checked={status === 'atendido'} />
                                <span>Atendido</span>
                            </div>
                        </div>

                        <label>Complemento</label>
                        <textarea value={complemento} onChange={(e) => { setComplemento(e.target.value) }} typeof='text' placeholder='Descreva seu problema ( Opcional )' />
                        <button type='submit'>Registrar</button>
                    </form>

                </div>
            </div>
        </div >
    )
}