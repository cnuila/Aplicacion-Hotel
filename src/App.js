import LogIn from "./Components/LogIn"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './Components/Rutas Privadas/Auth';
import PrivateRoute from "./Components/PrivateRoute"

function App() {
  return (
    <LogIn/>
  );
}

export default App;