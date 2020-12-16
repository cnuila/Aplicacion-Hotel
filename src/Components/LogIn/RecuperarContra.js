import React, { Component } from 'react'
import firebase from "../../firebase"

class RecuperarContra extends Component{
    
    constructor(){
        super()
        this.state={
            ID:"",
            Error:""
        }
    }

    handleID = (event) =>{
        this.setState({
            ID:event.target.value
        })
    }

//Manejo de promesa

    recoverPass = () => {
        var auth = firebase.auth() 
        var email = this.state.ID
        auth.sendPasswordResetEmail(email)
            .then(this.siSeEnvioElCorreo, this.noSeEnvioElCorreo)
    }

    siSeEnvioElCorreo = () =>{
        console.log("el correo se mando")
        this.setState({
            Error:"El correo se envió con éxito."
        })
    }

    noSeEnvioElCorreo = () =>{
        console.log("el correo no se mando") 
        this.setState({
            Error:"El correo no fue enviado. Ingrese su correo nuevamente."
        })
    }

    render(){
        return ( 
            <div className="md:bg-fixed w-auto h-auto place-items-center" style={{backgroundImage:`url(${"https://yosoypuebla.com/directorio/wp-content/uploads/2018/04/hotel-posada-cuetzalan-alberca.jpg"})`}}>
                <div className="grid min-h-screen place-items-center" >
                    <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-6/12">
                        <div className="text-center mb-8">
                            <h1 className="font-bold text-2x1 text-center mb-6">
                                Recuperación de Contraseña
                            </h1>
                        </div>
                        <form action="#">
                            <div className="mt-5">
                                <label> Ingrese su correo electrónico </label>
                                <input type="text" placeholder="john.doe@company.com" onChange = {this.handleID} className="block w-full p-2 border rounded border-gray-500 mt-2"></input>
                                <p className="text-red-500 mt-3 font-bold">{this.state.Error}</p>
                            </div>
                            <div className="mt-8">
                                <input type="submit" value="Recuperar Contraseña" onClick= {this.recoverPass} className="py-3 bg-green-500 text-white w-full rounded hover:bg-green-600"></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>  
        );
    }

}

export default RecuperarContra