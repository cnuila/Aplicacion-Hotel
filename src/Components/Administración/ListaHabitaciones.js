import React, { useState, useEffect } from 'react'
import { db, storage } from '../../firebase'
import swal from 'sweetalert'
import AgregarHabitaciones from './AgregarHabitaciones'
import ModificarHabitacion from './ModificarHabitacion'

export default function ListaHabitaciones() {

    const estadoInicial = {
        Nombre: "Nombre de la Habitación",
        Precio: 1000,
        Complementos: [{ id: 100, text: "Camas Dobles" }, { id: 200, text: "TV 55 pulgadas" }],
        Url: undefined,
    }

    const [habitaciones, setHabitaciones] = useState([])
    const [habitacionSeleccionada, setHabitacionSeleccionada] = useState({ ...estadoInicial, Complementos: [...estadoInicial.Complementos] })
    const [mostrarAgregar, setMostrarAgregar] = useState(false)
    const [mostrarModificar, setMostrarModificar] = useState(false)

    const getHabitaciones = () => {
        db.collection("Habitaciones").onSnapshot((querySnapshot) => {
            const listaHabitaciones = []
            const listaReseñas = []
            querySnapshot.forEach((doc) => {
                db.collection("Habitaciones").doc(doc.id).collection("Reseñas").onSnapshot((querySnapshot2) => {
                    querySnapshot2.forEach((doc2) => {
                        listaReseñas.push({ ...doc2.data(), id: doc2.id })
                    })
                })
                listaHabitaciones.push({ ...doc.data(), id: doc.id, reseñas: listaReseñas })
            });
            setHabitaciones(listaHabitaciones)
        })
    }

    useEffect(() => {
        getHabitaciones()
    }, [])

    const handleHabitacion = habitacion => {
        const { Nombre, Precio, Complementos, Url, reseñas } = habitacion
        setHabitacionSeleccionada({
            Nombre,
            Precio,
            Complementos,
            Url,
            reseñas,
        })
        setMostrarAgregar(false)
        setMostrarModificar(false)
    }

    const handleOnClickAgregar = () => {
        setMostrarAgregar(true)
        setHabitacionSeleccionada({ ...estadoInicial, Complementos: [...estadoInicial.Complementos] })
    }

    const handleEliminarHabitacion = async (id, fotos) => {
        let habitacion = db.collection("Habitaciones").doc(id)
        swal({
            title: "Esta seguro?",
            text: "La habitacion sera borrada permanentemente!",
            icon: "warning",
            buttons: {
                cancel: true,
                confirm: true,
            }
        }).then(async result => {
            console.log(result)
            if (result) {
                await habitacion.delete().then(() => {
                    if (fotos !== undefined) {
                        let deleteRef
                        for (let i = 0; i < fotos.length; i++) {
                            deleteRef = storage.refFromURL(fotos[i])
                            deleteRef.delete()
                        }
                    }
                }).then(() => {
                    swal({
                        text: "La Habitacion " + Nombre + " fue eliminada exitosamente",
                        icon: "success",
                        button: "Aceptar"
                    });
                    setHabitacionSeleccionada({ ...estadoInicial, Complementos: [...estadoInicial.Complementos] })
                    getHabitaciones()
                }).catch(function (error) {
                    swal({
                        icon: "error",
                        title: "Error al Eliminar",
                        text: "Error: " + error
                    })
                });
            } else {
                swal("Cancelado", "La habitacion no se borro");
            }
        });
    }

    const mostrarInicial = () => {
        setMostrarAgregar(false)
        setMostrarModificar(false)
        setHabitacionSeleccionada({ ...estadoInicial, Complementos: [...estadoInicial.Complementos] })
        getHabitaciones()
    }

    const handleOnClickModificar = () => {
        setMostrarModificar(true)
    }

    const { Nombre, Precio, Complementos, Url, reseñas } = habitacionSeleccionada
    console.log(habitaciones.reseñas)

    return (
        <div className="max-h-screen transform scale-0 sm:scale-100">
            <div className="grid grid-cols-3 bg-gray-100 max-h-screen min-h-screen">
                <div className="col-span-1 flex flex-col max-h-screen min-h-screen rounded-l-sm overflow-y-auto divide-y divide-gray-500 divide-opacity-50">
                    <div className="bg-gray-300 sticky z-10 opacity-95 top-0 rounded-t-md mx-1 mt-1 p-3">
                        <div className="relative grid text-center">
                            <div className="absolute p-1 place-self-end">
                                <svg className="fill-current mx-1 mt-1 cursor-pointer text-blue-500 hover:text-blue-600 h-5 w-5 place-self-center" onClick={handleOnClickAgregar} viewBox="0 0 426.667 426.667" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M405.332 192H234.668V21.332C234.668 9.559 225.109 0 213.332 0 201.559 0 192 9.559 192 21.332V192H21.332C9.559 192 0 201.559 0 213.332c0 11.777 9.559 21.336 21.332 21.336H192v170.664c0 11.777 9.559 21.336 21.332 21.336 11.777 0 21.336-9.559 21.336-21.336V234.668h170.664c11.777 0 21.336-9.559 21.336-21.336 0-11.773-9.559-21.332-21.336-21.332zm0 0" />
                                </svg>
                            </div>
                            <h2 className="font-bold text-lg">Habitaciones</h2>
                        </div>
                    </div>

                    {habitaciones.map((habitacion, index) => {
                        return (habitacionSeleccionada.Nombre === habitacion.Nombre ?
                            (<div key={index} className="mx-1 p-4 text-xs text-white font-semibold bg-gray-700 relative cursor-pointer" onClick={() => handleHabitacion(habitacion)}>
                                {habitacion.Nombre}
                            </div>)
                            :
                            (<div key={index} className="mx-1 p-4 text-xs font-semibold hover:bg-gray-200 relative cursor-pointer" onClick={() => handleHabitacion(habitacion)}>
                                {habitacion.Nombre}
                            </div>)
                        )
                    })}
                </div>
                <div className="flex col-span-2 max-h-screen min-h-screen overflow-y-auto rounded-r-sm justify-center">
                    {mostrarAgregar
                        ? (<AgregarHabitaciones mostrarInicial={mostrarInicial} />)
                        : mostrarModificar
                            ? <ModificarHabitacion nombre={habitacionSeleccionada.Nombre} mostrarInicial={mostrarInicial} />
                            : (
                                <div className="h-full w-10/12 px-20 py-8">
                                    <h1 className="font-bold text-center text-2xl mb-5 text-black m-3"> {Nombre} </h1>
                                    <div className="bg-gray-300 h-20 my-4 py-4 px-6 rounded-md">
                                        <h2 className="text-blue-500 font-semibold cursor-default">Precio</h2>
                                        <h2 className="text-black pl-4">Lps.{Precio}.00</h2>
                                    </div>
                                    <div className="bg-gray-300 my-4 py-4 px-6 rounded-md">
                                        <h2 className="text-blue-500 font-semibold cursor-default">Complementos</h2>
                                        {
                                            Complementos.map(complemento => {
                                                const { text } = complemento
                                                return <h2 className="text-black pl-4">{text}</h2>
                                            })
                                        }
                                    </div>
                                    {Url !== undefined
                                        ? (<div className="bg-gray-300 my-4 py-4 px-6 rounded-md">
                                            <h2 className="text-blue-500 font-semibold cursor-default mb-2">Fotos</h2>
                                            <div className="grid grid-cols-2 place-items-center">
                                                {
                                                    Url.map(foto => {
                                                        return (
                                                            <img
                                                                className="h-40 w-40 p-2 object-cover rounded-xl"
                                                                alt="Habitacion"
                                                                src={foto}
                                                            />)
                                                    })
                                                }
                                            </div>
                                        </div>)
                                        : <></>}
                                    {reseñas !== undefined
                                        ? (<div className="bg-gray-300 my-4 py-4 px-6 rounded-md">
                                            <h2 className="text-blue-500 font-semibold cursor-default mb-2">Reseñas</h2>
                                            <div className="grid">
                                                {
                                                    reseñas.map(reseña => {
                                                        const { usuario, rating, visualizar, comentario } = reseña
                                                        let text = "No"
                                                        if (visualizar) {
                                                            text = "Sí"
                                                        }
                                                        return (<div className="ml-4 bg-gray-200 p-3 rounded-md my-1">
                                                            <div className="flex flex-row">
                                                                <h2 className="font-bold">Visible:</h2>
                                                                <h2 className="pl-1"> {text}</h2>
                                                            </div>                                                            
                                                            <div className="flex flex-row">
                                                                <h2 className="font-bold">Rating:</h2>
                                                                <h2 className="px-1"> {rating}</h2>
                                                                <h2>de 5 estrellas</h2>
                                                            </div>
                                                            <div className="flex flex-row">
                                                                <h2 className="font-bold">Comentario:</h2>
                                                                <h2 className="pl-1"> {comentario}</h2>
                                                            </div>
                                                            <div className="flex flex-row">
                                                                <h2 className="font-bold">Usuario:</h2>
                                                                <h2 className="pl-1"> {usuario}</h2>
                                                            </div>
                                                        </div>)
                                                    })
                                                }
                                            </div>
                                        </div>)
                                        : <></>}
                                    {Nombre !== "Nombre de la Habitación" ? (
                                        <div class="grid grid-cols-2">
                                            <div>
                                                <button className="bg-red-300 h-10 w-24 rounded-md" onClick={() => handleEliminarHabitacion(Nombre, Url)}>
                                                    Eliminar
                                                </button>
                                            </div>
                                            <div>
                                                <button className="bg-blue-300 h-10 w-24 rounded-md" onClick={handleOnClickModificar}>
                                                    Modificar
                                                </button>
                                            </div>
                                        </div>) : (
                                            <div>
                                            </div>
                                        )
                                    }
                                </div>)
                    }
                </div>
            </div>
        </div>
    )
}