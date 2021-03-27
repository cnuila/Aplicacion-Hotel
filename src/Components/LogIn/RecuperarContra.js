import React, { useState } from 'react'
import firebase from "../../firebase"
import imagen from "./loginImagen.jpg"

function RecuperarContra() {

    const [id, setId] = useState("")
    const [error, setError] = useState(false)
    const [correcto, setCorrecto] = useState(false)

    const recoverPass = (e) => {
        e.preventDefault()
        var auth = firebase.auth()
        auth.sendPasswordResetEmail(id)
            .then(() => {
                if (error) {
                    setError(prevError => !prevError)
                }

                if (!correcto) {
                    setCorrecto(prevCorrecto => !prevCorrecto)
                }

            }).catch(() => {
                if (correcto) {
                    setCorrecto(prevCorrecto => !prevCorrecto)
                }

                if (!error) {
                    setError(prevError => !prevError)
                }

            })
    }
    return (
        <body background={imagen} >
            <div className="md:bg-fixed w-auto h-auto place-items-center" style={{ backgroundImage: `url(${"https://yosoypuebla.com/directorio/wp-content/uploads/2018/04/hotel-posada-cuetzalan-alberca.jpg"})` }}>
                <div className="grid min-h-screen place-items-center" >
                    <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-6/12">
                        <div className="text-center mb-8">
                            <h1 className="font-bold text-2x1 text-center mb-6">
                                Recuperación de Contraseña
                                </h1>
                        </div>
                        <form onSubmit={recoverPass}>
                            <div className="mt-5">
                                <label> Ingrese su correo electrónico </label>
                                <input type="text" placeholder="john.doe@company.com" onChange={event => setId(event.target.value)} className="block w-full p-2 border rounded border-gray-500 mt-2"></input>

                            </div><br />

                            {
                                error
                                    ?
                                    <a className="text-base text-red-600">El Correo ingresado es incorrecto</a>
                                    :
                                    <></>
                            }

                            {
                                correcto
                                    ?
                                    <a className="text-base text-green-500">Se envio con exito el correo!</a>
                                    :
                                    <></>
                            }

                            <div className="mt-8">
                                <button type="submit" className="py-3 bg-green-500 text-white w-full rounded hover:bg-green-600">Recuperar Contraseña</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </body>
    );
}


export default RecuperarContra