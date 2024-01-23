import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesApp from './routes'
import AuthProvider from './contexts/auth'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  useEffect(() => {
    document.title = 'Sistema de Chamados'
  }, [])

  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer autoClose={3000} theme="dark" />
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
