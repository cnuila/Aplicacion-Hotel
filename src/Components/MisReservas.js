import React, { useState, useEffect } from 'react'
import { db, auth } from '../firebase'
import moment from 'moment'
import swal from 'sweetalert'
import Navbar from './Navbar'

export default function MisReservas() {

    const [misReservas, setMisReservas] = useState([])

    useEffect(() => {
        setTimeout(() => {
            getMisReservas()
        }, 1000)
    }, [])



    const enviarPagoAlServidor = (respuesta) => {
        // There's no server-side component of these samples. No transactions are
        // processed and no money exchanged hands. Instantaneous transactions are not
        // realistic. Add a 2 second delay to make it seem more real.
        window.setTimeout(
            respuesta.complete('success').then(
                document.getElementById('result').innerHTML = instrumentToJsonString(respuesta)
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


    const getMisReservas = () => {
        let user = auth.currentUser;
        if (user) {
            db.collection("Reservas").where("emailCliente", "==", user.email).get().then(querySnapshot => {
                const listaReserva = []
                querySnapshot.forEach(doc => {
                    listaReserva.push({ ...doc.data(), id: doc.id })
                })
                setMisReservas(listaReserva)
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

    console.log(misReservas)
    return (
        <>
            <Navbar />
            <div className="bg-gray-100 min-h-screen">
                <h1 className="p-8 text-3xl font-semibold text-center lg:text-left text-blue-900 border-b-2 border-blue-900">Mis Reservas</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-2 lg:pt-8 px-2 lg:px-12">
                    {
                        misReservas.map((reserva, index) => {
                            const { idHabitacion, fechaInicial, pagada, precioPagar, id } = reserva
                            let fechaActual = moment(new Date())
                            let fechaInicialMoment = moment(new Date(fechaInicial.seconds * 1000))
                            let diferenciaDias = fechaInicialMoment.diff(fechaActual, 'days') + 1

                            let fechaMaxCancelar = ""
                            if (diferenciaDias > 3) {
                                fechaMaxCancelar = moment(new Date(fechaInicial.seconds * 1000)).subtract(3, "days").format('DD/MM/YYYY')
                            }

                            let fechaInicialFormat = fechaInicialMoment.format('DD/MM/YYYY')
                            return (
                                <div key={index} className="bg-gray-900 mx-3 mb-3 p-8 rounded-sm">
                                    <h2 className="text-xl font-bold mb-3 text-white">{idHabitacion}</h2>
                                    <div className="flex flex-row text-white">
                                        <h2>Lps.</h2>
                                        <h2 className="pl-0.5">{precioPagar}</h2>
                                        <h2>.00</h2>
                                    </div>
                                    <div className="flex flex-row text-white">
                                        <h2 className="font-semibold">Fecha de la reservación:</h2>
                                        <h2 className="px-1">{fechaInicialFormat}</h2>
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
                                    <div className="flex flex-row justify-end mt-6">
                                        {pagada
                                            ? <></>
                                            : (
                                                <div className="py-1 px-3 mx-3 bg-green-400 hover:bg-green-500 rounded-sm cursor-pointer text-gray-900 font-medium" onClick={() => clickPago(iniciarPago(reserva))}>
                                                    Pagar
                                                </div>
                                            )
                                        }
                                        {fechaMaxCancelar !== ""
                                            ? (
                                                <div className="py-1 px-3 mx-3 bg-red-400 hover:bg-red-500 rounded-sm cursor-pointer text-gray-900 font-medium" onClick={() => cancelarReserva(id)}>
                                                    Cancelar
                                                </div>
                                            )
                                            : <></>}
                                    </div>
                                </div>)
                        })
                    }
                </div>
            </div>
        </>
    )
}
