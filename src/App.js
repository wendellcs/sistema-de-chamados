import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesApp from './routes'

function App() {

  useEffect(() => {
    document.title = 'Sistema de Chamados'
  }, [])

  return (
    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter>
  );
}

export default App;
