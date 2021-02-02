import React, { useState, useEffect } from 'react'
import { db, auth } from "../../firebase"
import imagen from "../ImagenFondo2.jpg"
import InputMask from "react-input-mask";
import { Link } from 'react-router-dom';

export default function SignIn({ history }) {

    const estadoInicial = {
        Nombre: '',
        Apellido: '',
        Identidad: '',
        email: '',
        password: '',
        password2: '',
        Telefono: '',

    }
    const [info, setInfo] = useState({ ...estadoInicial })

    useEffect(() => {
        let user = auth.currentUser;
        console.log(user)
        if (user && user.providerData[0].providerId === "google.com") {
            let nombreApellido = user.displayName.split(" ")
            let correo = user.email;
            setInfo(prevInfo => {
                return ({
                    ...prevInfo,
                    Nombre: nombreApellido[0],
                    Apellido: nombreApellido[1],
                    email: correo,
                })
            })
        }
    }, [])

    const handleNombre = (event) => {
        var Nom = event.target.value
        Nom = Nom.replaceAll("_", "")
        setInfo(prevInfo => ({ ...prevInfo, Nombre: Nom, }))
    }

    const handleApellido = (event) => {
        var Ape = event.target.value
        Ape = Ape.replaceAll("_", "")
        Ape = Ape.replaceAll(" ", "")
        setInfo(prevInfo => ({ ...prevInfo, Apellido: Ape }))
    }

    const handlecontra = (event) => {
        setInfo(prevInfo => ({ ...prevInfo, password: event.target.value }))
    }

    const handleconfirma = (event) => {
        setInfo(prevInfo => ({ ...prevInfo, password2: event.target.value }))
    }

    const handleId = (event) => {
        var ID = event.target.value;
        ID = ID.replaceAll("_", "")
        ID = ID.replaceAll("-", "")
        setInfo(prevInfo => ({ ...prevInfo, Identidad: ID }))
    }

    const handleemail = (event) => {
        setInfo(prevInfo => ({ ...prevInfo, email: event.target.value }))
    }

    const handleTele = (event) => {
        var tele = event.target.value;
        tele = tele.replaceAll("_", "")
        setInfo(prevInfo => ({ ...prevInfo, Telefono: tele }))
    }

    const handleSubmit = async (event) => {

        event.preventDefault()

        if (info.password !== info.password2) {
            alert("las contraseñas no son iguales ")
        } else {
            let user = auth.currentUser;
            if (!user) {
                let email = info.email
                let password = info.password

                await auth.createUserWithEmailAndPassword(email, password)
                    .then(() => {
                    })
                    .catch((error) => {
                        let errorCode = error.code;
                        let errorMessage = error.message;
                        console.log(errorCode)
                        console.log(errorMessage)
                    });
            }
            db.collection("Usuarios").doc(info.Identidad).set({
                Identidad: info.Identidad,
                Nombre: info.Nombre,
                Apellido: info.Apellido,
                Email: info.email,
                Telefono: info.Telefono,
            }).then(() => {
                history.push("/");
            });
        }
    }

    let user = auth.currentUser;
    let inputEmail;
    let contraseña;
    let confirmarContra;
    if (user && user.providerData[0].providerId === "google.com") {
        inputEmail = <input id="email" type="email" name="email" minlengt="12" value={info.email} disabled className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
    } else {
        inputEmail = <input id="email" type="email" name="email" minlengt="12" onChange={handleemail} placeholder="john.doe@company.com" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
        contraseña = (<>
            <label for="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Confirmar Contraseña</label>
            <input id="password" type="password" minlengt="8" name="password" onChange={handlecontra} placeholder="********" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
        </>)
        confirmarContra = <>
            <label for="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Contraseña</label>
            <input id="Cpassword" type="password" minlengt="8" name="Cpassword" onChange={handleconfirma} placeholder="********" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
        </>
    }

    return (
        <body background={imagen} >

            <form onSubmit={handleSubmit}>
                <div className="grid min-h-screen place-items-center" >
                    <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
                        <div className="mt-6">
                            <div className="flex justify-between gap-3">
                                <span className="w-1/2">
                                    <label for="Nombre" className="block text-xs font-semibold text-gray-600 uppercase">Nombre</label>
                                    <InputMask mask="aaaaaaaaaaaaaaa" type="name" id="Nombre" disableUnderline onChange={handleNombre} value={info.Nombre} name="Nombre" placeholder="Juan" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                                </span>
                                <span className="w-1/2">
                                    <label for="Apellido" className="block text-xs font-semibold text-gray-600 uppercase">Apellido</label>
                                    <InputMask mask="aaaaaaaaaaaaaaa" id="Apellido" type="text" onChange={handleApellido} value={info.Apellido} name="Apellido" placeholder="Perez" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                                </span>

                            </div>
                            <label for="Telefono" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Telefono</label>
                            <InputMask mask="9999-9999" id="Telefono" type="text" disableUnderline onChange={handleTele} name="Identidad" placeholder="00000000" maskPlaceholder="-"//placeholder="0000-0000-0000" 
                                autoComplete="cc-number"
                                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required
                            />

                            <label for="Identidad" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Identidad-Pasaporte-Carnet de residente (sin guiones)</label>
                            <InputMask mask="****************" id="Identidad" disableUnderline type="text" onChange={handleId} name="Identidad" placeholder="0000-0000-00000" maskPlaceholder="-"//placeholder="0000-0000-0000" 
                                autoComplete="cc-number"
                                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required
                            />

                            <label for="email" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">E-mail</label>
                            {inputEmail}
                            {contraseña}
                            {confirmarContra}
                            <input value="Registrate" type="submit" className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none" />
                            <Link to="./login" className="flex justify-between  mt-4 text-xs text-gray-500 cursor-pointer hover:text-black"> ¿Ya estás registrado?</Link>
                        </div>
                    </div>
                </div>
            </form>
        </body>
    )
}