import React, { useState, useEffect } from 'react'
import Habitacion from './Habitacion'
import Navbar from './Navbar';
import { db } from '../firebase'

export default function Habitaciones() {

    const [habitaciones, setHabitaciones] = useState([])
    
    useEffect(() => {
        //función que lee todas las habitaciones y prepara su información para enviarla al componente Habitación
        db.collection("Habitaciones").onSnapshot((querySnapshot) => {
            const listaHabitaciones = []            
            querySnapshot.forEach((doc) => {
                const listaReseñas = []
                db.collection("Habitaciones").doc(doc.id).collection("Reseñas").onSnapshot((querySnapshot2) => {
                    querySnapshot2.forEach((doc2) => {
                        listaReseñas.push({ ...doc2.data(), id: doc2.id })
                    })
                })
                listaHabitaciones.push({ ...doc.data(), id: doc.id, reseñas: listaReseñas })
            });
            setHabitaciones(listaHabitaciones)
        })
    }, [])
    
    return (
        <div className="bg-gray-100 h-screen">
            <Navbar />
            <div class="space-y-4">
                <div className="text-4xl  text-center font-bold  mt-5">
                    Habitaciones
                </div>
                {habitaciones.map((habitacion, index) => {
                    if (habitacion.Visible) {
                        return (
                            <Habitacion key={index} id={habitacion.id} cantidad={habitacion.Cantidad} reseñas={habitacion.reseñas} precio={habitacion.Precio} complementos={habitacion.Complementos} url={habitacion.Url} nombre={habitacion.Nombre} />
                        )
                    }
                    return <></>
                })}

            </div>
        </div>
    );
}
