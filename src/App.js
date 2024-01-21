import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesApp from './routes'
import AuthProvider from './contexts/auth'

function App() {

  useEffect(() => {
    document.title = 'Sistema de Chamados'
  }, [])

  return (
    <BrowserRouter>
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
