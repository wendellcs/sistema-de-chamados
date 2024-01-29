import { AuthContext } from "../../contexts/auth"
import { useContext } from "react"
import Header from "../../components/Header"

export default function Dashboard() {
    const { logOut } = useContext(AuthContext)

    async function handleLogOut() {
        await logOut()
    }

    return (
        <div>
            <Header />
            <h1>Dashboard</h1>
            <button onClick={handleLogOut}>Sair</button>
        </div>
    )
}

