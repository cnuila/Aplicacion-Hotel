import React, { useState } from 'react'

export default function Administracion() {
  const [isClosed, setClosed] = useState(false)
  return (
    <div className="flex bg-gray-100">
      {!isClosed && (
        <aside
          aria-hidden={isClosed}
          className="bg-white w-64 min-h-screen flex flex-col"
        >
          <div className="bg-white border-r border-b px-4 h-10 flex items-center justify-between">
            <span className="text-blue py-2">Administracion</span>
          </div>

          <div className="border-r py-4 flex-grow relative">
            <nav>
              <ul>
                <li className="p-3">
                  <a href=""> Inicio </a>
                </li>
                <li className="p-3">
                  <a href=""> Clientes </a>
                </li>
                <li className="p-3">
                  <a href=""> Restaurante </a>
                </li>
                <li className="p-3">
                  <a href=""> Servicios </a>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      )}

      <main className="flex-grow flex flex-col min-h-screen">
        <header className="bg-white border-b h-10 flex items-center justify-center">
          {isClosed ? (
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
                stroke="currentColor"
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
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            )}

          <div className="flex flex-grow items-center justify-between px-3">
            <h1 className="text-lg">Inicio</h1>
            <button className="text-blue-700 underline">Salir de Sesion</button>
          </div>
        </header>
      </main>
    </div>
  )
}