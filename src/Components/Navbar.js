import React, { Component } from 'react';
import firebase from 'firebase'
import { Link } from 'react-router-dom';
import menuIcon from '../assets/Hamburger_icon.png'
import Dropdown from "./Dropdown";
import { auth } from '../firebase';

class Navbar extends Component {
    constructor() {
        super()
        this.state = {
            nombre: 'Perfil'
        }
    }

    cambiarNombre = (newName) => {
        this.setState({
            nombre: newName
        })
    }

    cambioDeEstado = () => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                this.cambiarNombre(user.displayName)
            } else {
                this.cambiarNombre('Perfil')
            }
        });
    }
    render() {
        return (
            <>
                <header class="lg:px-16 px-6 bg-blue-900 flex flex-wrap items-center lg:py-0 py-2 text-white">
                    <div class="flex-1 flex justify-between items-center">
                        <Link to="/">Hotel Posada del Ángel</Link>
                    </div>
                    
                    <label for="menu-toggle" class="cursor-pointer lg:hidden block">
                        <img src={menuIcon} class="fill-current text-white w-10 h-10" alt="Menu"></img>
                    </label>                
                    <input type="checkbox" class="hidden" id="menu-toggle" />
                    <Link to="/habitaciones" className="block px-4 py-2 text-sm text-white border-b-2 border-transparent hover:border-yellow-200">Habitaciones</Link>
                    <Link to="/servicios" className="block px-4 py-2 text-sm text-white border-b-2 border-transparent hover:border-yellow-200">Servicios</Link>
                    <Link to="/restaurante" className="block px-4 py-2 text-sm text-white border-b-2 border-transparent hover:border-yellow-200">Restaurante</Link>
                    <Link to="/login" className={(auth.currentUser ? "hidden" : "block px-4 py-2 text-sm text-white border-b-2 border-transparent hover:border-yellow-200")}>Iniciar Sesión</Link>
                    <div class="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
                        <nav>                            
                            <ul class="lg:flex items-center justify-between text-base text-white pt-4 lg:pt-0">
                                <li>
                                    <Dropdown />
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
            </>
        )
    }
}
export default Navbar
