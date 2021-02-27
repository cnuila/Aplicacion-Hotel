import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';
import { db } from '../firebase'
import Platillo from './Platillo';

export default function MenuRestaurante() {
    const [platillos, setPlatillos] = useState([])

    useEffect(() => {
        db.collection("Menu").onSnapshot((querySnapshot) => {
            const listaPlatillos = []
            querySnapshot.forEach((doc) => {
                listaPlatillos.push({ ...doc.data(), id: doc.id })
            });
            setPlatillos(listaPlatillos)
        })
    }, [])

    return (
        <div>
            <Navbar />
            <div class="pt-6 pb-12 bg-gray-800 h-screen">
                <div id="card" class="">
                    <h2 class="text-center font-serif text-yellow-400 uppercase text-4xl xl:text-5xl">Nuestros platillos</h2>
                    {
                        platillos.map(p => {
                            return (<div>
                                <Platillo nombre={p.Nombre} url={p.Url} detalles={p.Detalles}  />
                            </div>)
                        })
                    }
                </div>
            </div>
        </div>
    )

}