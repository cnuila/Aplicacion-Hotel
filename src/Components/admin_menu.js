import * as React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import ListaClientes from './Administración/ListaClientes'

const AdminMenu = function () {
  const [isClosed, setClosed] = React.useState(false)

  const isStatic = useMediaQuery({
    query: '(min-width: 640px)',
  })

  return (
    <Router>
      <div className="flex bg-gray-100">
        {(isStatic || !isClosed) && (
          <aside
            aria-hidden={isClosed}
            className="bg-white w-64 min-h-screen flex flex-col"
          >
            <div className="bg-green-600 text-white font-bold border-r border-b px-4 h-10 flex items-center justify-between">
              <span className="text-blue py-2">Menu</span>
            </div>

            <div className="bg-gray-900 border-r py-4 flex-grow relative">
              <nav>
                <ul>
                  <li className="p-3 hover:bg-blue-900" >
                    <Link to="/Admin/Inicio" className="btn btn-primary text-white">Inicio</Link>
                  </li>
                  <li className="p-3 hover:bg-blue-900" >
                    <Link to="/Admin/Clientes" className="btn btn-primary text-white">Clientes</Link>
                  </li>
                  <li className="p-3 hover:bg-blue-900">
                    <Link to="/Admin/Restaurante" className="btn btn-primary text-white">Restaurante</Link>
                  </li>
                  <li className="p-3 hover:bg-blue-900">
                    <Link to="/Admin/Servicios" className="btn btn-primary text-white">Servicios</Link>
                  </li>
                </ul>
              </nav>

            </div>
          </aside>
        )}

        <main className="flex-grow flex flex-col min-h-screen">
          <header className="bg-green-600 border-b h-10 flex items-center justify-center">
            {!isStatic && (isClosed ? (
              <button
                tabIndex="1"
                className="w-10 p-1"
                aria-label="Abrir menu"
                title="Abrir menu"
                onClick={() => setClosed(false)}
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            ) : (
                <button
                  tabIndex="1"
                  className="w-10 p-1"
                  aria-label="Cerrar"
                  title="Cerrar"
                  onClick={() => setClosed(true)}
                >
                  <svg
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="white"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              ))}

            <div className="flex flex-grow items-center justify-between px-3">
              <h1 className="text-lg text-white font-bold">Administración</h1>
              <button className="text-blue-700 underline">Salir de Sesion</button>
            </div>
          </header>

          <Switch>
            <Route path="/Admin/Inicio">
              <Inicio />
            </Route>
            <Route path="/Admin/Clientes">
              <Clientes />
            </Route>
            <Route path="/Admin/Restaurante">
              <Restaurante />
            </Route>
            <Route path="/Admin/Servicios">
              <Servicios />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
}

function Inicio() {
  return (
    <div>
      <h1>
        this is home
      </h1>
    </div>
  )
}

function Clientes() {
  return (
    <ListaClientes />
  )
}

function Restaurante() {
  return (
    <div>
      <h1>
        this is restaurant
      </h1>
    </div>
  )
}

function Servicios() {
  return (
    <div>
      <h1>
        this is services
      </h1>
    </div>
  )
}

export default AdminMenu;

