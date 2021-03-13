import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { db, auth } from "../firebase"

class Dropdown extends Component {
    /*Estados:
    open -> si el menú destá abierto
    dispName -> el nombre que se muestra en el botón
    admin -> si el usuario es un administrador
    */
    constructor() {
        super()
        this.state = {
            open: false,
            dispName: 'Perfil',
            admin: false,
        }
    }

    /*compara el correo del usuario actual con la lista de administradores*/
    revisarAdmin() {
        if (auth.currentUser) {
            var docRef = db.collection("Admin").doc(auth.currentUser.email);
            docRef.get().then((doc) => {
                if (doc.exists) {
                    this.setState({
                        admin: true
                    });
                } else {
                    this.setState({
                        admin: false
                    });
                }
            }).catch((error) => {
                this.setState({
                    admin: false
                });
            });
        } else {
            this.setState({
                admin: false
            });
        }
    }
    //Cambia el nombre en el botón al primer nombre del usuario o a 'Perfil'
    setDisplayName() {
        if (auth.currentUser) {
            db.collection("Usuarios").where("Email", "==", auth.currentUser.email)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.setState({
                            dispName: doc.data().Nombre
                        });
                    });
                })
                .catch((error) => {
                    this.setState({
                        dispName: 'Perfil'
                    });
                });
        } else {
            this.setState({
                dispName: 'Perfil'
            });
        }
    }
    //Cuando se monta el componente se cambian los estados
    componentDidMount() {
        this.setDisplayName()
        this.revisarAdmin();
    }

    //cerrar sesión en firebase. Cuando se llama se refresca la página
    cerrarSesion = () => {
        auth.signOut().then(function () {
            window.location.reload();
        }).catch(function (error) {
            console.log(error)
        });
    }

    //Abre y cierra el menú
    toggle() {
        this.setState(prevState => ({
            open: !prevState.open
        }))
    }

    render() {
        return (
            <div>
                <div class="relative inline-block text-left">
                    <div>
                        <button type="button" onClick={() => this.toggle()} class="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-blue-900 text-sm font-medium text-white my-2">
                            {this.state.dispName}
                            <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div class={(this.state.open ? "origin-top-right z-40 absolute lg:right-0 mt-2 lg:mt-0 w-48 rounded-md shadow-lg bg-blue-900 ring-1 ring-black ring-opacity-5" : "hidden")}>
                        <div class="py-1">
                            <Link to="/administracion" class={this.state.admin ? "block px-4 py-2 text-sm text-white border-b-2 border-transparent hover:border-yellow-200" : "hidden"} role="menuitem">Admin</Link>
                            <Link to="/login" className={(auth.currentUser ? "hidden" : "block px-4 py-2 text-sm text-white border-b-2 border-transparent hover:border-yellow-200")}>Iniciar Sesión</Link>                       
                            <Link to="/miInfo" class={(auth.currentUser ? "hidden" : "block px-4 py-2 text-sm text-white border-b-2 border-transparent hover:border-yellow-200")} role="menuitem">Mi Perfil</Link>
                            <Link to="/misReservas" class="block px-4 py-2 text-sm text-white border-b-2 border-transparent hover:border-yellow-200" role="menuitem">Mis Reservas</Link>
                            <Link to="/" class={(auth.currentUser ? "block px-4 py-2 text-sm text-white border-b-2 border-transparent hover:border-yellow-200" : "hidden")} role="menuitem" onClick={this.cerrarSesion}>Cerrar Sesión</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dropdown
