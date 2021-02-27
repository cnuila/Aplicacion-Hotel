import React from 'react'
import Navbar from './Navbar'

export default function MisReservas() {
    return (
        <>
            <Navbar />
            <div className="bg-gray-100 min-h-screen">
                <h1 className="p-8 text-3xl font-semibold text-center lg:text-left text-blue-900 border-b-2 border-blue-900">Mis Reservas</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-2 lg:pt-8 px-2 lg:px-12">
                    <div className="bg-gray-900 mx-3 mb-3 p-8 rounded-sm">
                        <h2 className="text-xl font-semibold mb-3 text-white">Nombre Habitación</h2>
                        <h2 className="text-white">Lps.1000.00</h2>
                        <h2 className="text-white">Fecha de la reservación: 02/07/2021</h2>
                        <h2 className="text-white">Fecha máxima para cancelar: 27/05/2021</h2>
                        <div className="flex flex-row justify-end mt-6">
                            <div className="py-1 px-3 mx-3 bg-green-400 hover:bg-green-500 rounded-sm cursor-pointer text-gray-900 font-medium">
                                Pagar
                            </div>
                            <div className="py-1 px-3 mx-3 bg-red-400 hover:bg-red-500 rounded-sm cursor-pointer text-gray-900 font-medium">
                                Cancelar
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
