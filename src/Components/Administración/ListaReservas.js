import React, { useState, useEffect } from 'react'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { db } from '../../firebase'
import moment from 'moment'

export default function ListaReservas() {

    const estadoInicial = {
        nombreCliente: "Nombre Cliente",
        nombreHabitacion: "Nombre Habitación",
        pagada: false,
        fechaInicial: "00/00/0000",
        idCliente:"0000-0000-0000"
    }

    const [reservas, setReservas] = useState([])
    const [reservaSeleccionada, setReservaSeleccionada] = useState({ ...estadoInicial })

    //función que prepara todas las reservas para ser mostradas en la lista del panel izquierdo, hace query a usuario y a las habitaciones        
    const getReservas = () => {
        db.collection("Reservas").orderBy("fechaInicial","desc").onSnapshot((querySnapshot) => {
            const listaReservas = []
            querySnapshot.forEach(async (doc) => {
                let nombreHabitacion = ""
                let celCliente = ""
                let nombreCliente = ""
                if (doc.data().administrador) {
                    nombreCliente = doc.data().nombreCliente
                } else {
                    await db.collection("Usuarios").where("Email", "==", doc.data().emailCliente).get().then(usuarios => {
                        usuarios.forEach(usuario => {
                            celCliente = usuario.data().Telefono
                            nombreCliente = usuario.data().Nombre + " " + usuario.data().Apellido
                        })
                    })
                }
                await db.collection("Habitaciones").doc(doc.data().idHabitacion).get().then(habitacion => {
                    nombreHabitacion = habitacion.data().Nombre
                })
                listaReservas.push({ ...doc.data(), id: doc.id, nombreHabitacion, nombreCliente, celCliente })
            });            
            setTimeout(() => {
                setReservas(listaReservas)
            }, 1000)
        })
    }

    useEffect(() => {
        getReservas()
    }, [])


    //funcion que recibe una reserva y prepara sus datos para ser mostrados en el panel derecho
    const handleReserva = reserva => {
        const { id, celCliente, fechaFinal, fechaInicial, emailCliente, idCliente, nombreCliente, pagada, precioPagar, nombreHabitacion } = reserva
        let fechaInicialMoment = moment(new Date(fechaInicial.seconds * 1000))
        let fechaFinalMoment = moment(new Date(fechaFinal.seconds * 1000))
        let fechaInicialFormat = fechaInicialMoment.format('DD/MM/YYYY')
        let fechaFinalFormat = fechaFinalMoment.format("DD/MM/YYYY")
        setReservaSeleccionada({
            id,
            celCliente,
            fechaInicial:fechaInicialFormat,
            fechaFinal:fechaFinalFormat,
            emailCliente,
            idCliente,
            nombreCliente,
            pagada,
            precioPagar,
            nombreHabitacion
        })
    }

    const { id, nombreCliente, idCliente, nombreHabitacion, emailCliente, celCliente , fechaInicial, fechaFinal, precioPagar } = reservaSeleccionada
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
                        return (id === reserva.id ?
                            (<div key={index} className="mx-1 p-4 text-xs text-white font-semibold bg-gray-700 relative cursor-pointer" onClick={() => handleReserva(reserva)}>
                                {reserva.nombreCliente + "  -  " + reserva.nombreHabitacion}
                            </div>)
                            :
                            (<div key={index} className="mx-1 p-4 text-xs font-semibold hover:bg-gray-200 relative cursor-pointer" onClick={() => handleReserva(reserva)}>
                                {reserva.nombreCliente + "  -  " + reserva.nombreHabitacion}
                            </div>)
                        )
                    })}
                </div>
                <div className="flex col-span-2 max-h-screen min-h-screen overflow-y-auto rounded-r-sm justify-center">
                    <div className="h-full w-10/12 px-20 py-8">
                        <h1 className="font-bold text-center text-2xl mb-5 text-black m-3"> {nombreCliente + " - " + nombreHabitacion} </h1>
                        {
                            precioPagar !== undefined ?
                                <div className="bg-gray-300 h-20 my-4 py-4 px-6 rounded-md">
                                    <h2 className="text-blue-500 font-semibold cursor-default">Precio a pagar</h2>
                                    <h2 className="text-black pl-4">Lps.{precioPagar}.00</h2>
                                </div> : <></>
                        }
                        <div className="bg-gray-300 h-20 my-4 py-4 px-6 rounded-md">
                            <h2 className="text-blue-500 font-semibold cursor-default">Pagada</h2>
                            <h2 className="text-black pl-4">No</h2>
                        </div>
                        <div className="bg-gray-300 my-4 py-4 px-6 rounded-md">
                            <h2 className="text-blue-500 font-semibold cursor-default">Información del Cliente</h2>
                            <h2 className="text-black pl-4">{idCliente}</h2>
                            <h2 className="text-black pl-4">{emailCliente}</h2>
                            { nombreCliente !== "" ? 
                                <h2 className="text-black pl-4">{nombreCliente}</h2>:<></>
                            }
                            { celCliente !== undefined && celCliente !== "" ? 
                                <h2 className="text-black pl-4">{celCliente}</h2>:<></>
                            }
                        </div>
                        <div className="bg-gray-300 h-20 my-4 py-4 px-6 rounded-md">
                            <h2 className="text-blue-500 font-semibold cursor-default">Fecha Inicial</h2>
                            <h2 className="text-black pl-4">{fechaInicial}</h2>
                        </div>
                        {
                            fechaFinal !== undefined ?
                                <div className="bg-gray-300 h-20 my-4 py-4 px-6 rounded-md">
                                    <h2 className="text-blue-500 font-semibold cursor-default">Fecha Final</h2>
                                    <h2 className="text-black pl-4">{fechaFinal}</h2>
                                </div> : <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}