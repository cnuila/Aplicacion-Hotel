import React, { useState, useEffect } from 'react'
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
            <div id="card" class="">
                {
                    platillos.map(p => {
                        return (<div>
                            <Platillo nombre={p.Nombre} url={p.Url} detalles={p.Detalles}  />
                        </div>)
                    })
                }
            </div>
        </div>
    )

}