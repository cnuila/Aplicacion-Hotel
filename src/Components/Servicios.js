import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { db } from '../firebase'

export default function Servicios() {

    const [servicios, setServicios] = useState([])

    useEffect(() => {
        getServicios()
    }, [])

    const getServicios = async () => {
        await db.collection("Servicios").orderBy("Nombre").get().then(querySnapshot => {
            const serviciosAgregar = []
            querySnapshot.forEach(doc => {
                serviciosAgregar.push({ ...doc.data(), id: doc.id })
            })
            setServicios(serviciosAgregar)
        })
    }

    return (
        <div>
            <Navbar />
            <div class="bg-white text text-2xl md:text-3xl text-center mt-5 mb-3 font-bold">Servicios</div>
            {servicios.map((servicio, index) => {
                const { Nombre, Precio, Detalles, Url } = servicio
                let foto1 = undefined
                let foto2 = undefined;
                if (Url !== undefined) {
                    if (Url[0] !== undefined) {
                        foto1 = Url[0]
                    }
                    if (Url[1] !== undefined) {
                        foto2 = Url[1]
                    }
                }

                if (servicio.Visible) {
                    return (
                        <div key={index} class="bg-gray-300 mx-0 my-10 lg:mx-10 rounded-xl flex flex-col md:flex-row border-b-2 border-gray-300 py-5 lg:py-4 px-2 items-center md:items-start md:justify-center space-x-0 md:space-x-10 space-y-2 md:space-y-0">

                            {foto1 !== undefined
                                ? (<img src={foto1} class="bg-blue-100 w-72 h-72 rounded" alt="Sala de conferencia1"></img>)
                                : <></>
                            }
                            {foto2 !== undefined
                                ? (<img src={foto2} class="bg-blue-100 md: w-72 h-72 rounded md:order-last" alt="Sala de conferencia2"></img>)
                                : <></>
                            }

                            <div class="flex flex-col pl-5 w-80 space-y-3 justify-between">
                                <div class="text-2xl font-semibold text-center">{Nombre}</div>
                                {Detalles !== undefined
                                    ? (<ul class="list-disc pl-5">
                                        {Detalles.map((detalle, index) => {
                                            return (<li key={index} class="">
                                                {detalle.text}
                                            </li>)
                                        })}
                                    </ul>)
                                    : <></>
                                }
                                <div>Lps. {Precio}</div>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}