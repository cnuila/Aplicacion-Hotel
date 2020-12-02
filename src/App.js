import Lista from "./Components/Lista"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './Components/Rutas Privadas/Auth';
import PrivateRoute from "./Components/Rutas Privadas/RutaPrivada"

function App() {
  return (
    <Lista/>
  );
}

export default App;