import React from 'react'

export default function Lista(props) {
    return (
        <div className="grid min-h-screen bg-blue-400">
            <div className="grid grid-cols-3 m-4 rounded-sm bg-gray-300">
                <div className="flex flex-col bg-yellow-600 divide-y divide-green-800 rounded-l-sm">
                    <div className="mx-1 mt-1 p-2 text-center font-semibold">
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
        
                </div>
                <div className="col-span-2 bg-green-600 rounded-r-sm">
                    Hola
                </div>
            </div>
        </div>
    )
}
