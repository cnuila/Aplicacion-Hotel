import React, { useState, useEffect } from 'react'
import AgregarMenu from './AgregarMenu'
import ModificarMenu from './ModificarMenu'
import { db, storage } from '../../firebase'
import swal from 'sweetalert'

export default function ListaMenu() {

    const estadoInicial = {
        Nombre: "Platillo",
        Precio: 1500,
        Detalles: [{ id: 1, text: "Langosta" }],
    }

    const [menu, setMenu] = useState([])
    const [platilloSeleccionado, setPlatilloSeleccionado] = useState({ ...estadoInicial, Detalles: [...estadoInicial.Detalles] })
    const [mostrarAgregar, setMostrarAgregar] = useState(false)
    const [mostrarModificar, setMostrarModificar] = useState(false)

    const getMenu = async () => {
        await db.collection("Menu").orderBy("Nombre").get().then(querySnapshot => {
            const menuAgregar = []
            querySnapshot.forEach(doc => {
                menuAgregar.push({ ...doc.data(), id: doc.id })
            })
            setMenu(menuAgregar)
        })
    }

    useEffect(() => {
        getMenu()
    }, [])

    const handlePlatillo = platillo => {
        const { Nombre, Precio, Detalles, Url } = platillo
        setPlatilloSeleccionado({
            Nombre,
            Precio,
            Detalles,
            Url,
        })
        setMostrarAgregar(false)
        setMostrarModificar(false)
    }

    const handleOnClickAgregar = () => {
        setMostrarAgregar(true)
        setPlatilloSeleccionado({ ...estadoInicial, Detalles: [...estadoInicial.Detalles] })
    }

    const handleEliminarMenu = async (id, fotos) => {
        let menu = db.collection("Menu").doc(id)
        await menu.delete().then(() => {
            if (fotos !== undefined) {
                let deleteRef
                for (let i = 0; i < fotos.length; i++) {
                    deleteRef = storage.refFromURL(fotos[i])
                    deleteRef.delete()
                }
            }
        }).then(() => {
            swal({
                text: "El Platillo " + Nombre + " fue eliminado exitosamente",
                icon: "success",
                button: "Aceptar"
            });
            setPlatilloSeleccionado({ ...estadoInicial, Detalles: [...estadoInicial.Detalles] })
            getMenu()
        }).catch(function (error) {
            swal({
                icon: "error",
                title: "Error al Eliminar",
                text: "Error: " + error
            })
        });
    }

    const mostrarInicial = () => {
        setMostrarAgregar(false)
        setMostrarModificar(false)
        setPlatilloSeleccionado({ ...estadoInicial, Detalles: [...estadoInicial.Detalles] })
        getMenu()
    }

    const handleOnClickModificar = () => {
        setMostrarModificar(true)
    }

    const { Nombre, Precio, Detalles, Url } = platilloSeleccionado

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
                            <h2 className="font-bold text-lg">Restaurante</h2>
                        </div>
                    </div>

                    {menu.map((platillo, index) => {
                        return (platilloSeleccionado.Nombre === platillo.Nombre ?
                            (<div key={index} className="mx-1 p-4 text-xs text-white font-semibold bg-gray-700 relative cursor-pointer" onClick={() => handlePlatillo(platillo)}>
                                {platillo.Nombre}
                            </div>)
                            :
                            (<div key={index} className="mx-1 p-4 text-xs font-semibold hover:bg-gray-200 relative cursor-pointer" onClick={() => handlePlatillo(platillo)}>
                                {platillo.Nombre}
                            </div>)
                        )
                    })}
                </div>
                <div className="flex col-span-2 max-h-screen min-h-screen overflow-y-auto rounded-r-sm justify-center">
                    {mostrarAgregar
                        ? (<AgregarMenu mostrarInicial={mostrarInicial} />)
                        : mostrarModificar
                            ? <ModificarMenu nombre={platilloSeleccionado.Nombre} mostrarInicial={mostrarInicial} />
                            : (
                                <div className="h-full w-10/12 px-20 py-8">
                                    <h1 className="font-bold text-center text-2xl mb-5 text-black m-3"> {Nombre} </h1>
                                    <div className="bg-gray-300 h-20 my-4 py-4 px-6 rounded-md">
                                        <h2 className="text-blue-500 font-semibold cursor-default">Precio</h2>
                                        <h2 className="text-black pl-4">{Precio}</h2>
                                    </div>
                                    <div className="bg-gray-300 my-4 py-4 px-6 rounded-md">
                                        <h2 className="text-blue-500 font-semibold cursor-default">Detalles</h2>
                                        {
                                            Detalles.map(detalle => {
                                                return <h2 className="text-black pl-4">{detalle.id} | {detalle.text}</h2>
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
                                                                alt="Platillo"
                                                                src={foto}
                                                            />)
                                                    })
                                                }
                                            </div>
                                        </div>)
                                        : <></>}
                                    {Nombre !== "Platillo" ? (
                                        <div class="grid grid-cols-2">
                                            <div>
                                                <button className="bg-red-300 h-10 w-24 rounded-md" onClick={() => handleEliminarMenu(Nombre, Url)}>
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