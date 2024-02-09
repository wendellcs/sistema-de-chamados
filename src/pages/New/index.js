import { useState } from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiPlusCircle } from 'react-icons/fi'
import './new.css'

export default function New() {

    const [costumers, setCostumers] = useState([])

    const [complemento, setComplemento] = useState('')
    const [assunto, setAssunto] = useState('suporte')
    const [status, setStatus] = useState('aberto')

    function handleOptionChange(e) {
        setStatus(e.target.value)


    }

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
                        <select id='clientes'>
                            <option key={1} value={1}>Mercado Teste</option>
                            <option key={2} value={2}>Loja Teste</option>
                            <option key={3} value={3}>Shopping Teste</option>
                            <option key={4} value={4}>Igreja Teste</option>
                        </select>

                        <label for='assunto'>Assunto</label>
                        <select id='assunto'>
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