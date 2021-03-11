import React, { useState, useEffect } from 'react'
import { db, auth } from '../firebase'
import moment from 'moment'
import swal from 'sweetalert'
import Navbar from './Navbar'
import PaypalButton from './PaypalButton'

export default function MisReservas() {

    const [misReservas, setMisReservas] = useState([])

    useEffect(() => {
        setTimeout(() => {
            getMisReservas()
        }, 1000)
    }, [])


    const clickPagar = (reserva, precioPagar) => {
        swal({
            title: "Pagar la Reserva",
            text: "Seleccione la opcion con la que desea pagar",
            buttons: {
                Paypal: {
                    text: "Paypal",
                    value: "paypal",
                    className: "bg-blue-600 hover:bg-blue-100",
                },
                TC: {
                    text: "Tarjeta",
                    value: "tc",
                    className: "hover:bg-yellow-100 bg-yellow-500 ",
                },
                cancel: true,
            },
        }).then((value) => {
            switch (value) {
                case "paypal":
                    <PaypalButton total={precioPagar} />
                    break;
                case "tc":
                    clickPago(iniciarPago(reserva))
                    break;
            }
        });
    }
    const enviarPagoAlServidor = (respuesta) => {
        // There's no server-side component of these samples. No transactions are
        // processed and no money exchanged hands. Instantaneous transactions are not
        // realistic. Add a 2 second delay to make it seem more real.
        window.setTimeout(
            respuesta.complete('success').then(
                swal({
                    text: instrumentToJsonString(respuesta),
                    icon: "info",
                    button: "Aceptar"
                })
            ).catch(error => {
                console.log(error)
            }), 3000);
    }
    function instrumentToJsonString(instrument) {
        let details = instrument.details;
        details.cardNumber = 'XXXX-XXXX-XXXX-' + details.cardNumber.substr(12);
        details.cardSecurityCode = '***';

        return JSON.stringify({
            methodName: instrument.methodName,
            details: details,
        }, undefined, 2);
    }
    const iniciarPago = (reserva) => {
        const metodos = ['amex', 'mastercard', 'visa'];
        const tipos = ['credit', 'debit']
        const methodData = [{
            supportedMethods: 'basic-card',
            data: { supportedNetworks: metodos, supportedTypes: tipos },
        }];

        let details = {
            total: { label: 'Total a pagar', amount: { currency: 'USD', value: ((reserva.precioPagar) + (reserva.precioPagar * 0.15)) } },
            displayItems: [
                {
                    label: 'Subtotal de la Reserva',
                    amount: { currency: 'USD', value: reserva.precioPagar },
                },
                {
                    label: 'Impuesto sobre la venta',
                    amount: { currency: 'USD', value: reserva.precioPagar * 0.15 },
                },
            ],
        };
        return new PaymentRequest(methodData, details);
    }
    const clickPago = (requestPago) => {
        requestPago.show().then(respuesta => {
            enviarPagoAlServidor(respuesta);
        }).catch(error => {
            console.log(error)
        })
    }


    const getMisReservas = async () => {
        let user = auth.currentUser;
        if (user) {
            await db.collection("Reservas").where("emailCliente", "==", user.email).get().then(querySnapshot => {
                const listaReserva = []
                querySnapshot.forEach(doc => {
                    let nombreHabitacion = ""
                    db.collection("Habitaciones").doc(doc.data().idHabitacion).get().then(habitacion => {
                        nombreHabitacion = habitacion.data().Nombre
                    }).then(() => {
                        listaReserva.push({ ...doc.data(), nombreHabitacion, id: doc.id })
                    })
                })
                setTimeout(() => {
                    setMisReservas(listaReserva)
                }, 1000)
            })
        }
    }

    const cancelarReserva = (idReservacion) => {
        swal({
            title: "¿Seguro quieres cancelar tu reservación?",
            text: "Una vez elimines tu reservación, no podrás deshacer la acción",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((seElimina) => {
            if (seElimina) {
                console.log(idReservacion)
                db.collection("Reservas").doc(idReservacion).delete().then(() => {
                    getMisReservas()
                    swal({
                        text: "Se canceló tu reservación con éxito",
                        icon: "warning",
                        button: "Aceptar"
                    });
                })
            }
        });
    }

    const mostrarReservas = misReservas.map((reserva, index) => {
        const { nombreHabitacion, fechaInicial, fechaFinal, pagada, precioPagar, id } = reserva
        let fechaActual = moment(new Date())
        let fechaInicialMoment = moment(new Date(fechaInicial.seconds * 1000))
        let fechaFinalMoment = moment(new Date(fechaFinal.seconds * 1000))

        let diasReserva = fechaFinalMoment.diff(fechaInicialMoment, "days") + 1
        let diferenciaDias = fechaInicialMoment.diff(fechaActual, 'days') + 1

        let fechaMaxCancelar = ""
        if (diferenciaDias > 3) {
            fechaMaxCancelar = moment(new Date(fechaInicial.seconds * 1000)).subtract(3, "days").format('DD/MM/YYYY')
        }

        let fechaInicialFormat = fechaInicialMoment.format('DD/MM/YYYY')
        let fechaFinalFormat = fechaFinalMoment.format("DD/MM/YYYY")
        return (
            <div key={index} className="bg-gray-900 mx-3 mb-3 p-8 rounded-sm">
                <h2 className="text-xl font-bold mb-3 text-white">{nombreHabitacion}</h2>
                <div className="flex flex-row text-white">
                    <h2>Lps.</h2>
                    <h2 className="pl-0.5">{precioPagar}</h2>
                    <h2>.00</h2>
                </div>
                <div className="flex flex-row text-white">
                    <h2 className="font-semibold">Fecha:</h2>
                    <h2 className="px-1">{fechaInicialFormat} - {fechaFinalFormat}</h2>
                </div>
                <div className="flex flex-row text-white">
                    <h2 className="font-semibold">Dias reservados:</h2>
                    {diasReserva > 1
                        ? <h2 className="px-1">{diasReserva} días</h2>
                        : <h2 className="px-1">1 día</h2>
                    }

                </div>
                {fechaMaxCancelar !== ""
                    ? (
                        <div className="flex flex-row text-white">
                            <h2 className="font-semibold">Fecha máxima para cancelar:</h2>
                            <h2 className="px-1">{fechaMaxCancelar}</h2>
                        </div>
                    )
                    : (
                        <div className="flex flex-row text-white">
                            <h2 className="font-semibold">Ya no puedes cancelar la reservación</h2>
                        </div>
                    )
                }
                <div className="flex flex-row justify-left mt-6">
                    {pagada
                        ? <></>
                        : (
                            <button type="button" className="bg-blue-400 h-10 w-20 hover:bg-blue-500" onClick={() => clickPagar(reserva, precioPagar)}>
                                Pagar
                            </button>
                        )
                    }
                    {fechaMaxCancelar !== ""
                        ? (
                            <button type="button" className="py-1 px-3 mx-3 bg-red-400 hover:bg-red-500 rounded-sm cursor-pointer text-gray-900 font-medium h-10" onClick={() => cancelarReserva(id)}>
                                Cancelar
                            </button>
                        )
                        : <></>}
                </div>
            </div>)
    })

    return (
        <>
            <Navbar />
            <div className="bg-gray-100 min-h-screen">
                <h1 className="p-8 text-3xl font-semibold text-center lg:text-left text-blue-900 border-b-2 border-blue-900">Mis Reservas</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-2 lg:pt-8 px-2 lg:px-12">
                    {mostrarReservas}
                </div>
            </div>
        </>
    )
}
