import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LogIn from './Components/LogIn/LogIn'
import SignIn from './Components/LogIn/SignIn'
import Administracion from './Components/admin_menu'
import LandingPage from "./Components/LandingPage"
import Listar from "./Components/Listar"
import RecuperarContraseña from './Components/LogIn/RecuperarContra'
import Servicos from './Components/Servicios'
import Habitaciones from './Components/prototipo'
import Restaurante from './Components/RestaurantePrincipal'
import { AuthProvider } from './Components/Rutas Privadas/Auth';
import PrivateRoute from "./Components/Rutas Privadas/RutaPrivada"
import Conferencias from "./Components/Conferencias"
import AgregarHabitaciones from "./Components/AgregarHabitaciones"
import RecuperarContra from './Components/LogIn/RecuperarContra';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={AgregarHabitaciones} />
        <Route path="/signup" component={SignIn} />
        <Route path="/login" component={LogIn} />
        <Route path="/administracion" component={Administracion} />
        <Route path="/recuperarContra" component={RecuperarContraseña} />
        <Route path="/servicios" component={Servicos} />
        <Route path="/habitaciones" component={Habitaciones} />
        <Route path="/restaurante" component={Restaurante} />
        <Route path="/conferencias" component={Conferencias}/>
      </Switch>
    </Router>
  );
}

export default App;