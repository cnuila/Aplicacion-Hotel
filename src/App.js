import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './Components/Rutas Privadas/Auth';
import PrivateRoute from "./Components/Rutas Privadas/RutaPrivada"
import SingIn from "./Components/SignIn"

function App() {
  return (
    <SingIn/>
  );
}

export default App;