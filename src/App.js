import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './Components/Rutas Privadas/Auth';
import PrivateRoute from "./Components/Rutas Privadas/RutaPrivada"
import admin_menu from "./Components/admin_menu"
import AdminMenu from './Components/admin_menu';

function App() {
  return (
    <AdminMenu/>
  );
}

export default App;