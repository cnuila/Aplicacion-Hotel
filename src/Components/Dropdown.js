import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import firebase from 'firebase'

class Dropdown extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
            signedIn: false
        }
    }
    cerrarSesion = () => {
        firebase.auth().signOut().then(function () {
        }).catch(function (error) {
            console.log(error)
        });
    }

    toggle(){
        this.setState(prevState =>({
            open: !prevState.open
        }))
    }

    render() {
        return (
            <div>
                <div class="relative inline-block text-left">
                    <div>
                        <button type="button" onClick={() => this.toggle()} class="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-blue-900 text-sm font-medium text-white">
                            Perfil
                            <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div class="origin-top-right z-40 absolute lg:right-0 mt-2 w-48 rounded-md shadow-lg bg-blue-900 ring-1 ring-black ring-opacity-5">
                        <div class={(this.state.open ? "py-1" : "hidden")}>
                            <Link to="/login" class={(this.state.signedIn ? "hidden" : "block px-4 py-2 text-sm text-white border-b-2 border-transparent hover:border-yellow-200")} role="menuitem">Iniciar Sesión</Link>
                            <div class={(this.state.signedIn ? "block px-4 py-2 text-sm text-white border-b-2 border-transparent hover:border-yellow-200" : "hidden")} role="menuitem" onClick={this.cerrarSesion}>Cerrar Sesión</div>
                            <a href="#" class="block px-4 py-2 text-sm text-white border-b-2 border-transparent hover:border-yellow-200" role="menuitem">Mi Perfil</a>
                            <a href="#" class="block px-4 py-2 text-sm text-white border-b-2 border-transparent hover:border-yellow-200" role="menuitem">Reservas</a>
                            <Link to="/administracion" class="block px-4 py-2 text-sm text-white border-b-2 border-transparent hover:border-yellow-200" role="menuitem">Admin</Link>
                        </div>
                    </div>
                    </div>
            </div>
        )
    }
}

export default Dropdown
