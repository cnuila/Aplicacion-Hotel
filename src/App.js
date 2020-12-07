import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LogIn from './Components/LogIn/LogIn'
import SignIn from './Components/LogIn/SignIn'
import Administracion from './Components/admin_menu'
import LandingPage from "./Components/LandingPage"
import RecuperarContraseña from './Components/LogIn/RecuperarContra'
import { AuthProvider } from './Components/Rutas Privadas/Auth';
import PrivateRoute from "./Components/Rutas Privadas/RutaPrivada"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/signup" component={SignIn} />
        <Route path="/login" component={LogIn} />
        <Route path="/administracion" component={Administracion} />
        <Route path="/recuperarContra" component={RecuperarContraseña} />
      </Switch>
    </Router>
  );
}

export default App;