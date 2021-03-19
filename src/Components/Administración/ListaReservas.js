import React, { useState, useEffect } from 'react'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { db } from '../../firebase'
import { Calendar, utils } from "react-modern-calendar-datepicker";
import swal from 'sweetalert'
import moment from 'moment'

export default function ListaReservas() {

    const estadoInicial = {
        Nombre: "Nombre de la Habitación",
        Precio: 1000,
        Complementos: [{ id: 100, text: "Camas Dobles" }, { id: 200, text: "TV 55 pulgadas" }],
        Url: undefined,
        Cantidad: 5,
        Visible: "Si"
    }

    const [reservas, setReservas] = useState([])
    const [reservaSeleccionada, setReservaSeleccionada] = useState({ ...estadoInicial, Complementos: [...estadoInicial.Complementos] })

    //función que prepara todas las reservas para ser mostradas en la lista del panel izquierdo        
    const getReservas = () => {
        db.collection("Reservas").onSnapshot((querySnapshot) => {
            const listaReservas = []
            querySnapshot.forEach((doc) => {
                let nombreHabitacion = ""
                let idHabitacion = doc.data().idHabitacion
                db.collection("Habitaciones").doc(idHabitacion).get().then(habitacion => {
                    console.log(habitacion.data().Nombre)
                    nombreHabitacion = habitacion.data().Nombre
                })
                listaReservas.push({ ...doc.data(), id: doc.id, nombreHabitacion })
            });
            setReservas(listaReservas)
        })
    }

    useEffect(() => {
        getReservas()
    }, [])


    //funcion que recibe una reserva y prepara sus datos para ser mostrados en el panel derecho
    const handleReserva = reserva => {
        const { id, Nombre, Precio, Complementos, Url, reseñas, Cantidad, Visible } = reserva
        setReservaSeleccionada({
            id,
            Nombre,
            Precio,
            Complementos,
            Url,
            reseñas,
            Cantidad,
            Visible
        })
        getReservas(id, Cantidad)
    }

    const mostrarInicial = () => {
        setReservaSeleccionada({ ...estadoInicial, Complementos: [...estadoInicial.Complementos] })
        getReservas()
    }

    const { id, Nombre, Precio, Cantidad } = reservaSeleccionada
    console.log(reservas)
    return (
        <div className="max-h-screen transform scale-0 sm:scale-100">
            <div className="grid grid-cols-3 bg-gray-100 max-h-screen min-h-screen">
                <div className="col-span-1 flex flex-col max-h-screen min-h-screen rounded-l-sm overflow-y-auto divide-y divide-gray-500 divide-opacity-50">
                    <div className="bg-gray-300 sticky z-10 opacity-95 top-0 rounded-t-md mx-1 mt-1 p-3">
                        <div className="relative grid text-center">
                            <h2 className="font-bold text-lg">Reservas</h2>
                        </div>
                    </div>

                    {reservas.map((reserva, index) => {
                        return (reservaSeleccionada.id === reserva.id ?
                            (<div key={index} className="mx-1 p-4 text-xs text-white font-semibold bg-gray-700 relative cursor-pointer" onClick={() => handleReserva(reserva)}>
                                {reserva.emailCliente}
                            </div>)
                            :
                            (<div key={index} className="mx-1 p-4 text-xs font-semibold hover:bg-gray-200 relative cursor-pointer" onClick={() => handleReserva(reserva)}>
                                {reserva.emailCliente}
                            </div>)
                        )
                    })}
                </div>
                <div className="flex col-span-2 max-h-screen min-h-screen overflow-y-auto rounded-r-sm justify-center">
                    <div className="h-full w-10/12 px-20 py-8">
                        <h1 className="font-bold text-center text-2xl mb-5 text-black m-3"> {Nombre} </h1>

                        <div className="bg-gray-300 h-20 my-4 py-4 px-6 rounded-md">
                            <h2 className="text-blue-500 font-semibold cursor-default">Precio</h2>
                            <h2 className="text-black pl-4">Lps.{Precio}.00</h2>
                        </div>
                        <div className="bg-gray-300 h-20 my-4 py-4 px-6 rounded-md">
                            <h2 className="text-blue-500 font-semibold cursor-default">Cantidad de Habitacones</h2>
                            <h2 className="text-black pl-4">{Cantidad}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}