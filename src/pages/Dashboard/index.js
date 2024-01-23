import { AuthContext } from "../../contexts/auth"
import { useContext } from "react"
export default function Dashboard() {
    const { logOut } = useContext(AuthContext)

    async function handleLogOut() {
        await logOut()
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogOut}>Sair</button>
        </div>
    )
}

