import { Routes, Route } from 'react-router-dom'
import SignIn from './../pages/SignIn/'
import SignUp from './../pages/SignUp/'
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Private from './Private';
import Costumers from '../pages/Customers';
import New from '../pages/New';

function RoutesApp() {
    return (

        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />

            {/* Private */}
            <Route path="/dashboard" element={<Private> <Dashboard /> </Private>} />
            <Route path="/profile" element={<Private> <Profile /> </Private>} />
            <Route path="/costumers" element={<Private> <Costumers /> </Private>} />
            <Route path="/new" element={<Private> <New /> </Private>} />
            <Route path="/new/:id" element={<Private> <New /> </Private>} />
        </Routes>

    );
}

export default RoutesApp;