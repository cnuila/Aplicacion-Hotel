import React from 'react'
import { db, auth } from "../../firebase"
import imagen from "../ImagenFondo2.jpg"
import InputMask from "react-input-mask";
import { Link } from 'react-router-dom';

class SingIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.estadoInicial,
        }
    }
    estadoInicial = {
        Nombre: '',
        Apellido: '',
        Identidad: '',
        email: '',
        password: '',
        password2: '',
        Telefono: '',
    }
    handleNombre = (event) => {
        var Nom = event.target.value
        Nom = Nom.replaceAll("_", "")
        this.setState({
            Nombre: Nom,
        })
    }
    handleApellido = (event) => {   
        var Ape = event.target.value
        Ape = Ape.replaceAll("_", "")
        Ape = Ape.replaceAll(" ", "")
        this.setState({
            Apellido: Ape,
        })
    }
    handlecontra = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleconfirma = (event) => {
        this.setState({
            password2: event.target.value
        })
    }
    handleId = (event) => {
        var ID = event.target.value;
        ID = ID.replaceAll("_", "")
        ID = ID.replaceAll("-", "")
        this.setState({
            Identidad: ID
        })
    }
    handleemail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleTele = (event) => {
        var tele = event.target.value;
        tele = tele.replaceAll("_", "")
        this.setState({
            Telefono: tele
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        // perform all neccassary validations
        if (this.state.password !== this.state.password2) {
            alert("las contraseñas no son iguales ")
        } else {
            db.collection("Usuarios").doc(this.state.Identidad).set({
                Identidad: this.state.Identidad,
                Nombre: this.state.Nombre,
                Apellido: this.state.Apellido,
                Contrasena: this.state.password,
                Email: this.state.email,
                Telefono: this.state.Telefono,
            }).then(() => { 
            });
            let email = this.state.email
            let password = this.state.password
            auth.createUserWithEmailAndPassword(email, password)
                .then((user) => {     
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });
        }
    }
    render() {
        return (
            <body background={imagen} >
                <form onSubmit={ this.handleSubmit}>
                    <div className="grid min-h-screen place-items-center" >
                        <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
                            <div className="mt-6">
                                <div className="flex justify-between gap-3">
                                    <span className="w-1/2">
                                        <label for="Nombre" className="block text-xs font-semibold text-gray-600 uppercase">Nombre</label>
                                        <InputMask mask="aaaaaaaaaaaaaaa" type="name" id="Nombre" disableUnderline onChange={this.handleNombre} name="Nombre" placeholder="Juan" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                                    </span>
                                    <span className="w-1/2">
                                        <label for="Apellido" className="block text-xs font-semibold text-gray-600 uppercase">Apellido</label>
                                        <InputMask mask="aaaaaaaaaaaaaaa" id="Apellido" type="text" onChange={this.handleApellido} name="Apellido" placeholder="Perez" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                                    </span>
                                </div>
                                <label for="Telefono" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Telefono</label>
                                <InputMask mask="9999-9999" id="Telefono" type="text" disableUnderline onChange={this.handleTele} name="Identidad" placeholder="00000000" maskPlaceholder="-"//placeholder="0000-0000-0000" 
                                    autoComplete="cc-number" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required/>
                                <label for="Identidad" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Identidad-Pasaporte-Carnet de residente (sin guiones)</label>
                                <InputMask mask="****************" id="Identidad" disableUnderline type="text" onChange={this.handleId} name="Identidad" placeholder="0000-0000-00000" maskPlaceholder="-"//placeholder="0000-0000-0000" 
                                    autoComplete="cc-number" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required/>
                                <label for="email" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">E-mail</label>
                                <input id="email" type="email" name="email" minlengt="12" onChange={this.handleemail} placeholder="john.doe@company.com" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                                <label for="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Contraseña</label>
                                <input id="password" type="password" minlengt="8" name="password" onChange={this.handlecontra} placeholder="********" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                                <label for="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Confirmar Contraseña</label>
                                <input id="Cpassword" type="password" minlengt="8" name="Cpassword" onChange={this.handleconfirma} placeholder="********" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                                <input value="Registrate" type="submit" className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none" />
                                <Link to="./login" className="flex justify-between  mt-4 text-xs text-gray-500 cursor-pointer hover:text-black"> ¿Ya estás registrado?</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </body>

        );
    }
}
export default SingIn;