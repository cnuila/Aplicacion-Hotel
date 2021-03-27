import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import menuIcon from '../assets/Hamburger_icon.png'
import Dropdown from "./Dropdown";

class Navbar extends Component {
  /*Navbar responsiva.
  Permite listar varios links como elementos de lista <li> dentro del divisor <ul>
  El último elemento debe ser el componente Dropdown
  */
    render() {
        return (
            <>
                <header class="lg:px-16 px-6 bg-blue-900 flex flex-wrap items-center lg:py-0 py-2 text-white">
                    <div class="flex-1 flex justify-between items-center">
                        <Link to="/">Hotel Posada del Ángel</Link>
                    </div>
                        <nav>                            
                            <ul class="lg:flex items-center justify-between text-base text-white pt-4 lg:pt-0">
                                <li>
                                    <Dropdown/>
                                </li>
                            </ul>
                        </nav>
                </header>
            </>
        )
    }
}
export default Navbar