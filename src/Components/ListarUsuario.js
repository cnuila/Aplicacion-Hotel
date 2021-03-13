import React, { useEffect, useState } from "react";
import imagen from "./ImagenFondo2.jpg"
import InputMask from "react-input-mask"
import Navbar from './Navbar'
import { db, auth } from "../firebase"
import swal from 'sweetalert'
import { Link } from 'react-router-dom'

export default function ListarUsuario({ history }) {
    const [info, setInfo] = useState({})

    useEffect(() => {
        setTimeout(() => {
            infoUsuario()
        }, 1000)
    }, [])

    //función asíncrona que recupera la información del usuario actual
    const infoUsuario = async () => {
        const email = auth.currentUser.email;
        const query = await db.collection("Usuarios").where("Email", "==", email).get();
        query.forEach(doc => {
            setInfo({
                Nombre: doc.data().Nombre,
                Apellido: doc.data().Apellido,
                Identidad: doc.data().Identidad,
                Email: doc.data().Email,
                Telefono: doc.data().Telefono,
            })
        })
    }

    //función que actualiza los campos que se cambian
    const handleInputChange = ({ target }) => {
        const { name, value } = target
        setInfo(prevInfo => ({ ...prevInfo, [name]: value }))
    }

    //función que actualiza la información que se cambió en la interfaz
    const handleOnSubmit = (e) => {
        e.preventDefault()
        const { Identidad, Nombre, Apellido, Telefono } = info
        db.collection("Usuarios").doc(Identidad).update({
            Nombre,
            Apellido,
            Telefono,
        }).then(() => {
            swal({
                text: "Se actualizó su información",
                icon: "success",
                button: "Aceptar"
            });
        }).catch(error => {
            swal({
                text: `Error: ${error}`,
                icon: "warning",
                button: "Aceptar"
            });
        })
    }

    //función que elimina la cuenta de un usario si no tiene reservas vigentes
    const eliminarCuenta = () => {
        db.collection("Usuarios").doc(info.Identidad).delete().then(() => {
            auth.currentUser.delete().then(() => {
                swal({
                    text: "Se eliminó tu usuario",
                    icon: "success",
                    button: "Aceptar"
                });
                history.push("/")
            })
        }).catch(error => {
            swal({
                text: `Error: ${error}`,
                icon: "warning",
                button: "Aceptar"
            });
        })
    }

    return (
        <>
            <Navbar />
            <body background={imagen} >
                <div className=" grid h-full place-items-center">
                    <div className=" container mx-auto">
                        <div className="bg-white inputs w-full max-w-2xl p-6 mx-auto">
                            <h2 className="text-2xl text-gray-900">Mi Cuenta</h2>
                            <form className="  mt-6 border-t border-gray-400 pt-4" onSubmit={handleOnSubmit}>
                                <div className='flex flex-wrap -mx-3'>
                                    <div className='w-full md:w-full px-3 mb-6'>
                                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' for='grid-text-1'>Identidad o Pasaporte</label>
                                        <InputMask mask="" value={info.Identidad} name="Identidad" className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='text' placeholder='ID' required disabled />
                                    </div>
                                    <div className='w-full md:w-full px-3 mb-6'>
                                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' for='grid-text-1'>Email</label>
                                        <input name="Email" value={info.Email} className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='text' placeholder='email' disabled>
                                        </input>
                                    </div>
                                    <div className='w-full md:w-full px-3 mb-4 '>
                                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Contraseña</label>
                                        <div className="grid w-1/4 h-10 place-items-center bg-black hover:bg-gray-900 cursor-pointer">
                                            <Link to="/recuperarContra" className="text-sm text-white"> Cambiar Contraseña</Link>
                                        </div>
                                    </div>

                                    <div className="personal w-full border-t border-gray-400 pt-4 mb-2">
                                        <h2 className="text-2xl pl-3 text-gray-900">Información personal</h2>
                                        <div className="flex items-center justify-between mt-4">
                                            <div className='w-full md:w-1/2 px-3'>
                                                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >Nombre</label>
                                                <InputMask mask="" value={info.Nombre} name="Nombre" className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='text' onChange={handleInputChange} required />

                                            </div>
                                            <div className='w-full md:w-1/2 px-3'>
                                                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >Apellido</label>
                                                <InputMask mask="" name="Apellido" value={info.Apellido} className='appearance-none block w-full bg-white text-gray-700 text-grnpm install react-input-maskay-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='text' onChange={handleInputChange} required />

                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-4">
                                            <div className='w-full md:w-1/2 px-3 mb-2'>
                                                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >Teléfono</label>
                                                <InputMask mask="" name="Telefono" value={info.Telefono} className='appearance-none block w-full bg-white text-gray-700 text-grnpm install react-input-maskay-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='text' onChange={handleInputChange} required />

                                            </div>

                                            <div className="flex justify-end mt-2">
                                                <button type="button" className="bg-red-600 hover:bg-red-700 text-sm mx-3 px-2 text-white focus:outline-none" onClick={eliminarCuenta}> Eliminar Cuenta </button>
                                                <button className="appearance-none h-10 bg-black hover:bg-gray-900 text-white text-sm focus:outline-none px-2 py-1 shadow-sm border mr-3" type="submit">Guardar Cambios</button>
                                            </div>
                                        </div>

                                        <p className="text-right mt-4 text-xs text-gray-500  ">Al darle click a Guardar cambios, actualizaremos tus datos  </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </body>
        </>
    )
}