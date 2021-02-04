import React, { useState, useEffect } from 'react'
import Habitacion from './Habitacion'
import Navbar from './Navbar';
import { db } from '../firebase'

export default function Habitaciones() {

    const [habitaciones, setHabitaciones] = useState([])


    useEffect(() => {
        db.collection("Habitaciones").onSnapshot((querySnapshot) => {
            const listaHabitaciones = []
            querySnapshot.forEach((doc) => {
                listaHabitaciones.push({ ...doc.data(), id: doc.id })
            });
            setHabitaciones(listaHabitaciones)
        })
    }, [])

    return (
        <div className="bg-gray-100 h-full">
            <div>
                <Navbar />
            </div>
            <div className="text-2xl text-center font-bold mt-3">
                Habitaciones
                </div>
            <div class="space-y-4">
                {habitaciones.map(h => {
                    return (
                        <div>
                            <Habitacion precio={h.Precio} complementos={h.Complementos} url={h.Url} nombre={h.Nombre} />
                        </div>
                    )
                })}

            </div>
        </div>
    );
}
