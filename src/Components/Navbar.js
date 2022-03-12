import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import menuIcon from '../assets/Hamburger_icon.png'
import Dropdown from "./Dropdown";

import img_logo from '../imagenes/logo_hotel_posada.png';

class Navbar extends Component {
    /*Navbar responsiva.
    Permite listar varios links como elementos de lista <li> dentro del divisor <ul>
    El último elemento debe ser el componente Dropdown
    */
    render() {
        return (
            <>
                <header class="lg:px-16 px-6 bg-white flex flex-wrap items-center lg:py-0 py-2 text-white">
                    <div class="flex-1 flex justify-between items-center">
                        <Link to="/">
                            <div class="sm:my-1 sm:px-1 sm:w-1/2 md:my-px md:px-px md:w-1/2 lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4 pb-6">
                                <img class="mt-10 mb-1" src={img_logo} alt="Logo" />
                            </div>
                        </Link>
                    </div>
                    <Link to="/habitaciones" class="block px-4 py-2 text-sm text-blue-900 border-b-2 border-transparent hover:border-yellow-200">Habitaciones</Link>
                    <Link to="/servicios" class=" block px-4 py-2 text-sm text-blue-900 border-b-2 border-transparent hover:border-yellow-200">Servicios</Link>
                    <div className='flex md:inline-flex'>
                        <Link to="/restaurante" class="block px-4 py-2 text-sm text-blue-900 border-b-2 border-transparent hover:border-yellow-200">Restaurante</Link>
                    </div>
                    <nav>
                        <ul class="lg:flex items-center justify-between text-base text-blue-900 pt-2 lg:pt-0">
                            <li>
                                <Dropdown />
                            </li>
                        </ul>
                    </nav>
                </header>
            </>
        )
    }
}
export default Navbar