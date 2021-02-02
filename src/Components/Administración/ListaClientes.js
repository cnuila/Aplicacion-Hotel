import React, { useState, useEffect } from 'react'
import { db } from '../../firebase'

export default function Lista() {

    const [listaClientes, setLista] = useState([])
    const [cargando, setCargando] = useState(true)
    const [ultimo, setUltimo] = useState({})
    const [nombre, setNombre] = useState("Nombre")
    const [apellido, setApellido] = useState("Apellido")
    const [email, setEmail] = useState("john.va@va.org")
    const [identidad, setIdentidad] = useState("0801-2000-08813")
    const [telefono, setTelefono] = useState("9999-9999")
    const [clienteSeleccionado, setCliente] = useState({})

    const handleScroll = event => {
        if (ultimo !== undefined) {
            const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
            let bottom = scrollHeight - scrollTop;
            if (Math.floor(bottom) === clientHeight || Math.ceil(bottom) === clientHeight) {
                setCargando(true)
                nextPage(ultimo)
            }
        }
    }

    function nextPage(ultimo) {
        if (ultimo !== undefined) {
            let query = db.collection("Usuarios").orderBy("Nombre").startAfter(ultimo).limit(10)
            mostrarQuery(query)
        }
    }

    const mostrarQuery = async (query) => {
        query.onSnapshot((querySnapshot) => {
            const clientes = []
            querySnapshot.forEach((doc) => {
                clientes.push({ ...doc.data(), id: doc.id })
            });
            setLista(listaClientes.concat(clientes))
            const last = querySnapshot.docs[querySnapshot.docs.length - 1]
            if (last !== undefined) {
                setUltimo(last)
            }
        })
        setCargando(false);
    }

    const getClientes = async () => {
        let query = db.collection("Usuarios").orderBy("Nombre").limit(20)
        mostrarQuery(query)
    }

    useEffect(() => {
        getClientes()
    }, [])

    const handleCliente = cliente => {
        setNombre(cliente.Nombre)
        setApellido(cliente.Apellido)
        setEmail(cliente.Email)
        if (cliente.Identidad === undefined){
            setIdentidad("*Pendiente*")
        } else{
            setIdentidad(cliente.Identidad)
        }
        if (cliente.Telefono === undefined){
            setTelefono("*Pendiente*")
        } else {
            setTelefono(cliente.Telefono)
        }
        setCliente(cliente)        
    }

    return (
        <div className="max-h-screen transform scale-0 sm:scale-100">
            <div className="grid grid-cols-3 bg-gray-100 max-h-screen min-h-screen">
                <div className="col-span-1 flex flex-col max-h-screen min-h-screen rounded-l-sm overflow-y-auto divide-y divide-gray-500 divide-opacity-50" onScroll={handleScroll}>
                    <div className="bg-gray-300 sticky z-10 opacity-95 top-0 rounded-t-md mx-1 mt-1 p-3 text-center font-bold text-lg">
                        Clientes
                    </div>

                    {listaClientes.map(cliente => {
                        return ( clienteSeleccionado.Identidad === cliente.Identidad ?
                            (<div className="mx-1 p-4 text-xs text-white font-semibold bg-gray-700 relative cursor-pointer" onClick={() => handleCliente(cliente)}>
                                {cliente.Nombre} {cliente.Apellido}                               
                            </div>)
                            :
                            (<div className="mx-1 p-4 text-xs font-semibold hover:bg-gray-200 relative cursor-pointer" onClick={() => handleCliente(cliente)}>
                                {cliente.Nombre} {cliente.Apellido}                                
                            </div>)
                        )
                    })}
                    {cargando &&
                        <cargando className="text-center mx-1 p-4 text-xs font-semibold">
                            Cargando...
                        </cargando>
                    }
                </div>

                <div className="flex col-span-2 max-h-screen min-h-screen rounded-r-sm justify-center">
                    <div className="h-full w-10/12 px-20 py-16">
                        <h1 className="font-bold text-center text-2xl mb-10 text-black m-3"> {nombre} {apellido} </h1>
                        <div className="bg-gray-300 h-20 my-4 py-4 px-6 rounded-md">
                            <h2 className="text-blue-500 font-semibold cursor-default">Número de Identidad</h2>
                            <h2 className="text-black">{identidad}</h2>
                        </div>
                        <div className="bg-gray-300 h-20 my-4 py-4 px-6 rounded-md">
                            <h2 className="text-blue-500 font-semibold cursor-default">Email</h2>
                            <h2 className="text-black">{email}</h2>
                        </div>                        
                        <div className="bg-gray-300 h-20 my-4 py-4 px-6 rounded-md">
                            <h2 className="text-blue-500 font-semibold cursor-default">Teléfono</h2>
                            <h2 className="text-black">{telefono}</h2>
                        </div>
                        <button className="mt-4 py-2 px-4 bg-red-600 rounded-md text-gray-100"> Eliminar Cliente </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
