import React from 'react'

export default function Lista(props) {
    return (
        <div className="max-h-screen">
            <div className="grid grid-cols-3 bg-gray-100 max-h-screen min-h-screen">

                <div className="col-span-1 flex flex-col max-h-screen min-h-screen rounded-l-sm p-2 overflow-y-auto divide-y divide-gray-500 divide-opacity-50">
                    <div className="bg-gray-300 sticky top-0 opacity-95 rounded-t-md mx-1 mt-1 p-3 text-center font-bold text-lg">
                        Clientes
                    </div>
                    <div className="mx-1 p-4 text-xs font-semibold">
                        nombre
                    </div>
                    <div className="mx-1 p-4 text-xs font-semibold">
                        nombre
                    </div>
                    <div className="mx-1 p-4 text-xs font-semibold">
                        nombre
                    </div>
                    <div className="mx-1 p-4 text-xs font-semibold">
                        nombre
                    </div>
                    <div className="mx-1 p-4 text-xs font-semibold">
                        nombre
                    </div>
                    <div className="mx-1 p-4 text-xs font-semibold">
                        nombre
                    </div>
                    <div className="mx-1 p-4 text-xs font-semibold">
                        nombre
                    </div>
                    <div className="mx-1 p-4 text-xs font-semibold">
                        nombre
                    </div>
                    <div className="mx-1 p-4 text-xs font-semibold">
                        nombre
                    </div>
                    <div className="mx-1 p-4 text-xs font-semibold">
                        nombre
                    </div>
                    <div className="mx-1 p-4 text-xs font-semibold">
                        nombre
                    </div>
                    <div className="mx-1 p-4 text-xs font-semibold">
                        nombre
                    </div>
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
