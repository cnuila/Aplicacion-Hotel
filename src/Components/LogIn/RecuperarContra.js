import React, { Component } from 'react'
import hotel1 from "./hotel1.jpg"
import firebase from "../../firebase"

class RecuperarContra extends Component{

    constructor(){
        super()
        this.state={
            ID:""
        }
    }

    handleID = (event) =>{
        this.setState({
            ID:event.target.value
        })
    }

    recoverPass = () => {
        var auth = firebase.auth() 
        var email = this.state.ID
        auth.sendPasswordResetEmail(email)
            .then(function(){
                console.log("Pasa aqui al correo")
            }, function(error){
                console.log(error)
            })
    }

    render(){
        return ( 
            <div className="bg-white max-h-full place-items-center max-w-full">
                <img className="absolute max-h-full max-w-full opacity-50" src={hotel1}/>
                <div className="container max-h-full relative place-items-center max-w-full">
                    <div className="container mx-auto p-2 content-center">
                        <div className="max-w-sm mx-auto my-24  bg-gray-100 px-5 py-10 rounded shadow-xl">
                            <div className="text-center mb-8">
                                <h1 className="font-bold text-2x1 text-center mb-6">
                                    Recuperación de Contraseña
                                </h1>
                            </div>
                            <form action="#">
                                <div className="mt-5">
                                    <label> Ingrese su correo electrónico </label>
                                    <input type="text" onChange = {this.handleID} className="block w-full p-2 border rounded border-gray-500 mt-2"></input>
                                </div>
                                <div className="mt-10">
                                    <input type="submit" value="Recuperar Contraseña" onClick= {this.recoverPass} className="py-3 bg-green-500 text-white w-full rounded hover:bg-green-600"></input>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>  
        );
    }

}

export default RecuperarContra