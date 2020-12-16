import { PreviousMap } from 'postcss';
import React, { useState, useEffect } from 'react'
import { db } from '../../firebase'

export default function Lista() {

    const [listaClientes, setLista] = useState([])
    const [cargando, setCargando] = useState(true);
    const [ultimo, setUltimo] = useState({})

    const handleScroll = event => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        var bottom = scrollHeight - scrollTop;
        if (Math.floor(bottom) === clientHeight || Math.ceil(bottom) === clientHeight) {
            console.log("entre")
            setCargando(true)
            nextPage(ultimo)
        }
    }

    function nextPage(ultimo) {
        console.log("nextPage");
        console.log("ultimo: ", ultimo);
        let query = db.collection("Usuarios").orderBy("Nombre").startAfter(ultimo).limit(10)
        mostrarQuery(query)
    }

    const mostrarQuery = async (query) => {
        console.log("array viejo: ", listaClientes);
        query.onSnapshot((querySnapshot) => {
            const clientes = []
            querySnapshot.forEach((doc) => {
                clientes.push({ ...doc.data(), id: doc.id })
            });
            setLista(listaClientes.concat(clientes))            
            const last = querySnapshot.docs[querySnapshot.docs.length - 1]
            console.log(last)
            setUltimo(last)
            console.log("array nuevo: ", clientes);
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

    return (
        <div className="max-h-screen transform scale-0 sm:scale-100">
            <div className="grid grid-cols-3 bg-gray-100 max-h-screen min-h-screen">
                <div className="col-span-1 flex flex-col max-h-screen min-h-screen rounded-l-sm p-2 overflow-y-auto divide-y divide-gray-500 divide-opacity-50" onScroll={handleScroll}>
                    <div className="bg-gray-300 sticky z-10 opacity-95 top-0 rounded-t-md mx-1 mt-1 p-3 text-center font-bold text-lg">
                        Clientes
                    </div>

                    {listaClientes.map(cliente => {
                        return (
                            <div className="mx-1 p-4 text-xs font-semibold hover:bg-gray-200 relative">
                                {cliente.Nombre} {cliente.Apellido}
                                <button className="ml-4 p-1 bg-red-400 inset-y-0 right-0 absolute inset-y-3 right-3"> Eliminar </button>
                            </div>
                        )
                    })}
                    {cargando &&
                        <cargando className="text-center mx-1 p-4 text-xs font-semibold">
                            Cargando...
                        </cargando>
                    }
                </div>

                <div className="flex col-span-2 max-h-screen min-h-screen rounded-r-sm justify-center">
                    <div className="h-full w-10/12 px-20 py-14">
                        <h1 className="font-bold text-center text-2xl mb-10 text-black m-3"> Nombre y Apellido </h1>
                        <div className="bg-gray-300 h-20 my-3 py-4 px-6 rounded-md">
                            <h2 className="text-blue-500 font-semibold">Email</h2>
                            <h2 className="text-black">john.va@va.org</h2>
                        </div>
                        <div className="bg-gray-300 h-20 my-3 py-4 px-6 rounded-md">
                            <h2 className="text-blue-500 font-semibold">Número de Identidad</h2>
                            <h2 className="text-black">0801-2000-08813</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
