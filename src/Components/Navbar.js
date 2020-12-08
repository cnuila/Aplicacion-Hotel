import React from 'react';
import firebase from 'firebase'
import { Link } from 'react-router-dom';
import menuIcon from '../assets/Hamburger_icon.png'

export default function Navbar() {

    const cerrarSesion = () => {
        firebase.auth().signOut().then(function () {
            console.log("Cerró Sesión")
        }).catch(function (error) {
            console.log("No se cerró")
            console.log(error)
        });
    }

    return (
        <>
            <header class="lg:px-16 px-6 bg-white flex flex-wrap items-center lg:py-0 py-2">
                <div class="flex-1 flex justify-between items-center">
                <Link to="/">Hotel Posada del Ángel</Link>
                </div>
                
                <label for="menu-toggle" class="cursor-pointer lg:hidden block">
                    <img src={menuIcon} class = "fill-current text-gray-900 w-10 h-10" alt = "Menu"></img>
                </label>
                <input type="checkbox" class="hidden" id="menu-toggle" />
                
                 <div class="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
                    <nav>
                        <ul class="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
                            <li>
                                <Link to="/login" class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400">Inicio de Sesión</Link>
                            </li>
                            <li>
                                <Link to="/signup" class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400">Registrate</Link>
                            </li>
                            <li>
                                <Link to="/servicios" class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400">Servicios</Link>
                            </li>
                            <li>
                                <Link to="/conferencias" class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400">Conferencias</Link>
                            </li>
                            <li>
                                <Link to="/administracion" class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400">Admin</Link>
                            </li>
                            <li>
                                <a href="./" class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400" onClick={cerrarSesion}>Cerrar Sesion</a>
                            </li>
                        </ul>
                    </nav>
                    <a href="./" class="lg:ml-4 flex items-center justify-start lg:mb-0 mb-4 cursor-pointer">
                        <img src="" class="rounded-full w-10 h-10 border-2 border-transparent hover:border-indigo-400" alt="Profile"></img>
                    </a>
                </div>
            </header>        
        </>
    )
}
