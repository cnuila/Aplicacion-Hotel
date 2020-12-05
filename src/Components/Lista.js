import React from 'react'

export default function Lista(props) {
    return (
        <div className="grid max-h-screen min-h-screen bg-blue-400">
            <div className="grid grid-cols-3 m-4 rounded-sm bg-gray-300">
                <div className="flex flex-col bg-yellow-600 divide-y divide-green-800 rounded-l-sm">
                    <div className="mx-1 mt-1 p-3 text-center font-semibold text-lg">
                        Clientes
                    </div>
                    <div className="mx-1 p-4 text-xs">
                        nombre
                    </div>
                    <div className="mx-1 p-4 text-xs">
                        nombre
                    </div>
                    <div className="mx-1 p-4 text-xs">
                        nombre
                    </div>
                    <div className="mx-1 p-4 text-xs">
                        nombre
                    </div>
                    <div className="mx-1 p-4 text-xs">
                        nombre
                    </div>
                    <div className="mx-1 p-4 text-xs">
                        nombre
                    </div>
                    <div className="mx-1 p-4 text-xs">
                        nombre
                    </div>
                    <div className="mx-1 p-4 text-xs">
                        nombre
                    </div>
                    <div className="mx-1 p-4 text-xs">
                        nombre
                    </div>
                    <div className="mx-1 p-4 text-xs">
                        nombre
                    </div>
                    <div className="mx-1 p-4 text-xs">
                        nombre
                    </div>
                    <div className="mx-1 p-4 text-xs">
                        nombre
                    </div>
                </div>
                <div className="flex col-span-2 bg-green-600 rounded-r-sm justify-center">
                    <div className="bg-pink-600 h-full w-10/12 px-20 py-14">
                        <h1 className="font-bold text-center text-2xl mb-10 text-black m-3"> Nombre y Apellido </h1>                        
                        <div className="bg-white h-20 my-3 py-4 px-6 rounded-md">
                            <h2 className="text-gray-500 font-semibold">Email</h2>
                            <h2 className="text-black">john.va@va.org</h2>
                        </div>
                        <div className="bg-white h-20 my-3 py-4 px-6 rounded-md">
                            <h2 className="text-gray-500 font-semibold">Número de Identidad</h2>
                            <h2 className="text-black">0801200008813</h2>
                        </div>                                             
                    </div>
                </div>
            </div>
        </div>
    )
}
