import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LogIn from './Components/LogIn/LogIn'
import SignIn from './Components/LogIn/SignIn'
import Administracion from './Components/admin_menu'
import LandingPage from "./Components/LandingPage"
import ListarUsuario from "./Components/ListarUsuario"
import RecuperarContraseña from './Components/LogIn/RecuperarContra'
import Servicos from './Components/Servicios'
import Habitaciones from './Components/Habitaciones'
import Restaurante from './Components/RestaurantePrincipal'
import MisReservas from './Components/MisReservas'
import { AuthProvider } from './Components/Rutas Privadas/Auth';
import PrivateRoute from "./Components/Rutas Privadas/RutaPrivada"
import InfoHabitacion from "./Components/InformacionHabitacion"
import Menu from "./Components/RestaurantePrincipal"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/signup" component={SignIn} />
        <Route path="/login" component={LogIn} />
        <Route path="/administracion" component={Administracion} />
        <Route path="/recuperarContra" component={RecuperarContraseña} />
        <Route path="/servicios" component={Servicos} />
        <Route path="/miInfo" exact component={ListarUsuario} />
        <Route path="/habitaciones" exact component={Habitaciones} />
        <Route path="/restaurante" component={Restaurante} />
        <Route path="/habitaciones/:nombre" component={InfoHabitacion} />
        <Route path="/menu" component={Menu} />
        <Route path="/misReservas" component={MisReservas}/>
      </Switch>
    </Router>
  );
}

export default App;