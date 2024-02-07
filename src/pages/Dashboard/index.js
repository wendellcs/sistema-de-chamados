import { AuthContext } from "../../contexts/auth"
import { useContext } from "react"
import Header from "../../components/Header"
import Title from "../../components/Title"
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from "react-icons/fi"
import { Link } from "react-router-dom"

import './dashboard.css'

export default function Dashboard() {
    const { logOut } = useContext(AuthContext)

    async function handleLogOut() {
        await logOut()
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name='tickets'>
                    <FiMessageSquare size={25} />
                </Title>

                <>
                    <Link to={'/new'} className="new">
                        <FiPlus color="#fff" size={25} />
                        Novo chamado
                    </Link>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Cliente</th>
                                <th scope="col">Assunto</th>
                                <th scope="col">Status</th>
                                <th scope="col">Cadastrado em</th>
                                <th scope="col">#</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label='cliente'>Mercado Esquina</td>
                                <td data-label='Assunto'>Suporte</td>
                                <td data-label='Status' style={{ backgroundColor: '#999' }}>
                                    <span className="badge">
                                        Em aberto
                                    </span>
                                </td>
                                <td data-label='Cadastrado'>12/05/2022</td>
                                <td data-label='#'>
                                    <button className="action" style={{ backgroundColor: '#3583f6' }}><FiSearch color="#fff" size={17} /></button>
                                    <button className="action" style={{ backgroundColor: '#f6a935' }}><FiEdit2 color="#fff" size={17} /></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>

            </div>
            <button onClick={handleLogOut}>Sair</button>
        </div>
    )
}

