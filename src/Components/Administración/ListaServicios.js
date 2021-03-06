import React, { useState, useEffect } from 'react'
import { db, storage } from '../../firebase'
import swal from 'sweetalert'
import AgregarServicios from './AgregarServicios'
import ModificarServicios from './ModificarServicios'

export default function ListaServicios() {

    const estadoInicial = {
        Nombre: "Nombre del Servicio",
        Precio: 1000,
        Detalles: [{ id: 1, text: "Comida gratis" }],
        Visible: "Si"
    }

    const [servicios, setServicios] = useState([])
    const [servicioSeleccionado, setServicioSeleccionado] = useState({ ...estadoInicial, Detalles: [...estadoInicial.Detalles] })
    const [mostrarAgregar, setMostrarAgregar] = useState(false)
    const [mostrarModificar, setMostrarModificar] = useState(false)

    //función asíncrona que recupera los servicios de la db y los prepara para mostrarlos en la lista del panel izquierdo
    const getServicios = async () => {
        await db.collection("Servicios").orderBy("Nombre").get().then(querySnapshot => {
            const serviciosAgregar = []
            querySnapshot.forEach(doc => {
                serviciosAgregar.push({ ...doc.data(), id: doc.id })
            })
            setServicios(serviciosAgregar)
        })
    }

    useEffect(() => {
        getServicios()
    }, [])

    //función que recibe un servicio y lo prepara para ser mostrado en el panel derecho
    const handleServicio = servicio => {
        const { Nombre, Precio, Detalles, Url, Visible } = servicio
        setServicioSeleccionado({
            Nombre,
            Precio,
            Detalles,
            Url,
            Visible
        })
        setMostrarAgregar(false)
        setMostrarModificar(false)
    }

    //función que prepara la interfaz para poder agregar un servicio
    const handleOnClickAgregar = () => {
        setMostrarAgregar(true)
        setServicioSeleccionado({ ...estadoInicial, Detalles: [...estadoInicial.Detalles] })
    }

    const handleEliminarServicio = async (id, fotos) => {
        let servicio = db.collection("Servicios").doc(id)
        swal({
            title: "Esta seguro?",
            text: "El Servicio sera borrado permanentemente!",
            icon: "warning",
            buttons: {
                cancel: true,
                confirm: true,
            }
        }).then(async result => {
            if (result) {
                await servicio.delete().then(() => {
                    if (fotos !== undefined) {
                        let deleteRef
                        for (let i = 0; i < fotos.length; i++) {
                            deleteRef = storage.refFromURL(fotos[i])
                            deleteRef.delete()
                        }
                    }
                }).then(() => {
                    swal({
                        text: "El Servicio " + Nombre + " fue eliminado exitosamente",
                        icon: "success",
                        button: "Aceptar"
                    });
                    setServicioSeleccionado({ ...estadoInicial, Detalles: [...estadoInicial.Detalles] })
                    getServicios()
                }).catch(function (error) {
                    swal({
                        icon: "error",
                        title: "Error al Eliminar",
                        text: "Error: " + error
                    })
                });
            } else {
                swal("Cancelado", "El Servicio no se borro");
            }
        })

    }

    const mostrarInicial = () => {
        setMostrarAgregar(false)
        setMostrarModificar(false)
        setServicioSeleccionado({ ...estadoInicial, Detalles: [...estadoInicial.Detalles] })
        getServicios()
    }

    const handleOnClickModificar = () => {
        setMostrarModificar(true)
    }

    const { Nombre, Precio, Detalles, Url, Visible } = servicioSeleccionado

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
                            <h2 className="font-bold text-lg">Servicios</h2>
                        </div>
                    </div>

                    {servicios.map((servicio, index) => {
                        return (servicioSeleccionado.Nombre === servicio.Nombre ?
                            (<div key={index} className="mx-1 p-4 text-xs text-white font-semibold bg-gray-700 relative cursor-pointer" onClick={() => handleServicio(servicio)}>
                                {servicio.Nombre}
                            </div>)
                            :
                            (<div key={index} className="mx-1 p-4 text-xs font-semibold hover:bg-gray-200 relative cursor-pointer" onClick={() => handleServicio(servicio)}>
                                {servicio.Nombre}
                            </div>)
                        )
                    })}
                </div>
                <div className="flex col-span-2 max-h-screen min-h-screen overflow-y-auto rounded-r-sm justify-center">
                    {mostrarAgregar
                        ? (<AgregarServicios mostrarInicial={mostrarInicial} servicios={servicios} />)
                        : mostrarModificar
                            ? <ModificarServicios nombre={servicioSeleccionado.Nombre} mostrarInicial={mostrarInicial} servicios={servicios} />
                            : (
                                <div className="h-full w-10/12 px-20 py-8">
                                    <h1 className="font-bold text-center text-2xl mb-5 text-black m-3"> {Nombre} </h1>

                                    {Nombre !== "Nombre del Servicio" ? (
                                        <div class="grid grid-cols-6 gap-x-2">
                                            <div className="col-span-3">
                                                <button className="bg-red-600 text-sm text-white h-10 w-full rounded-md" onClick={() => handleEliminarServicio(Nombre, Url)}>
                                                    Eliminar Servicio
                                            </button>
                                            </div>
                                            <div className="col-span-3">
                                                <button className="bg-blue-700 text-sm text-white h-10 w-full rounded-md" onClick={handleOnClickModificar}>
                                                    Modificar Servicio
                                            </button>
                                            </div>
                                        </div>) : (
                                        <div>
                                        </div>
                                    )
                                    }

                                    {Visible
                                        ?
                                        <div className="bg-gray-300 h-20 my-4 py-4 px-6 rounded-md">
                                            <h2 className="text-blue-500 font-semibold cursor-default">Visible</h2>
                                            <h2 className="text-black pl-4">Si</h2>
                                        </div>
                                        :
                                        <div className="bg-gray-300 h-20 my-4 py-4 px-6 rounded-md">
                                            <h2 className="text-blue-500 font-semibold cursor-default">Visible</h2>
                                            <h2 className="text-black pl-4">No</h2>
                                        </div>
                                    }

                                    <div className="bg-gray-300 h-20 my-4 py-4 px-6 rounded-md">
                                        <h2 className="text-blue-500 font-semibold cursor-default">Precio</h2>
                                        <h2 className="text-black pl-4">{Precio}</h2>
                                    </div>
                                    <div className="bg-gray-300 my-4 py-4 px-6 rounded-md">
                                        <h2 className="text-blue-500 font-semibold cursor-default">Detalles</h2>
                                        {
                                            Detalles.map(detalle => {
                                                return <h2 className="text-black pl-4">{detalle.text}</h2>
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
                                                                alt="Servicio"
                                                                src={foto}
                                                            />)
                                                    })
                                                }
                                            </div>
                                        </div>)
                                        : <></>}

                                </div>)
                    }
                </div>
            </div>
        </div>
    )
}