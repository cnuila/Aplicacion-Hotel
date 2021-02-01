import React, { useState, useEffect } from 'react'
import Habitacion from './Habitacion'
import Navbar from './Navbar';
import { db } from '../firebase'

export default function Habitaciones(){

    const [habitaciones, setHabitaciones] = useState([])


    useEffect(() => {
        db.collection("Habitaciones").onSnapshot((querySnapshot) => {
            const listaHabitaciones = []
            querySnapshot.forEach((doc) => {
                listaHabitaciones.push({ ...doc.data(), id: doc.id })
            });
            setHabitaciones(listaHabitaciones)
            console.log(listaHabitaciones)
        })
    }, [])

    return (
        <div className="bg-white">
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
                            {h.Precio}
                            <Habitacion />
                        </div>
                    )
                })}

            </div>
        </div>
    );
}
