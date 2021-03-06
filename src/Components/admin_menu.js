import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import ListaClientes from './Administración/ListaClientes'
import ListaHabitaciones from './Administración/ListaHabitaciones'
import ListaServicios from './Administración/ListaServicios'
import ListaMenu from './Administración/ListaMenu'
import ListaReservas from './Administración/ListaReservas'
import Navbar from './Navbar'

//menu del admin
const AdminMenu = function () {
  const [isClosed, setClosed] = React.useState(false)

  const isStatic = useMediaQuery({
    query: '(min-width: 640px)',
  })

  //muestra el menu del admin con la navbar y los demas componentes
  return (
    <div>
      <Navbar />
      <Router>
        <div className="flex bg-gray-100">
          {(isStatic || !isClosed) && (
            <aside
              aria-hidden={isClosed}
              className="bg-white w-64 min-h-screen flex flex-col"
            >

              <div className="bg-gray-300 border-r py-3 pl-1 flex-grow relative text-black font-semibold">
                <nav>
                  <ul>
                    <li className="p-3 hover:bg-gray-400" >
                      <Link to="/administracion/Clientes" className="btn btn-primary">Clientes</Link>
                    </li>
                    <li className="p-3 hover:bg-gray-400">
                      <Link to="/administracion/Habitaciones" className="btn btn-primary">Habitaciones</Link>
                    </li>
                    <li className="p-3 hover:bg-gray-400">
                      <Link to="/administracion/Reservas" className="btn btn-primary">Reservas</Link>
                    </li>
                    <li className="p-3 hover:bg-gray-400">
                      <Link to="/administracion/Restaurante" className="btn btn-primary">Menus</Link>
                    </li>
                    <li className="p-3 hover:bg-gray-400">
                      <Link to="/administracion/Servicios" className="btn btn-primary">Servicios</Link>
                    </li>                    
                  </ul>
                </nav>

              </div>
            </aside>
          )}

          <main className="flex-grow flex flex-col min-h-screen">
            {//rutas de la pagina del admin
            }
            <Switch>
              <Route path="/administracion/Clientes">
                <Clientes />
              </Route>
              <Route path="/administracion/Habitaciones">
                <Habitaciones />
              </Route>
              <Route path="/administracion/Reservas">
                <Reservas />
              </Route>
              <Route path="/administracion/Restaurante">
                <Restaurante />
              </Route>
              <Route path="/administracion/Servicios">
                <Servicios />
              </Route>              
            </Switch>
          </main>
        </div>
      </Router>
    </div>
  )
}

//llama la funcion correcta para mostrar en la pagina del admin
function Clientes() {
  return (
    <ListaClientes />
  )
}

function Restaurante() {
  return (
    <ListaMenu />
  )
}

function Servicios() {
  return (
    <ListaServicios />
  )
}

function Habitaciones() {
  return (
    <ListaHabitaciones />
  )
}

function Reservas() {
  return (
    <ListaReservas />
  )
}

export default AdminMenu;

