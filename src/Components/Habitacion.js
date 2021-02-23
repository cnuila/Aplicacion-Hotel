import React, { useState, useEffect } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from 'react-router-dom';
import { storage } from '../firebase';
import InfoHabitacion from './InformacionHabitacion';

export default function Habitacion(props) {
    const [fotos, setFotos] = useState([])
    useEffect(() => {
        async function descargarFotos() {
            let arreglofotos = []
            for (let i = 0; i < props.url.length; i++) {
                let storageRef = storage.refFromURL(props.url[i])
                await storageRef.getDownloadURL().then(direc => {
                    arreglofotos.push(direc)
                }).catch((error) => {
                    console.log("ERROR: " + error)
                })
            }
            setFotos(arreglofotos)
        }
        descargarFotos()
    }, [props.url])
    return (
        <div>
            <div className="grid grid-cols-1 m-3 md:m-6 sm:grid-cols-2 sm:px-8 sm:gap-x-8 pb-4 md:py-12  bg-local bg-white rounded-lg">
                <div className="relative z-10 col-start-1 row-start-1 px-4 pt-40 md:pt-20 pb-3 bg-gradient-to-t sm:bg-none">
                    <p className="text-sm font-medium text-black sm:mb-1 sm:text-black">Habitacion</p>
                    <h2 className="text-xl font-semibold text-black sm:text-2xl sm:leading-7 sm:text-black md:text-3xl">{props.nombre}</h2>
                </div>

                <div className="col-start-1 row-start-2 px-4 md:pb-10 bg-none">

                    <div className="flex items-center text-sm font-medium mt-5 mb-3 sm:mt-2 sm:mb-2 text-black">
                        <div>{"Lps." + props.precio+".00"}</div>
                    </div>
                    <div className="text-sm font-medium text-black mt-2 mb-4 md:mt-6 md:mb-0">
                        <h2>Incluye:</h2>
                        <ul className="grid grid-cols-1 mt-2 lg:grid-cols-2 list-disc list-inside bg-rose-200 pl-4">
                            {props.complementos.map((complemento, index) => {
                                return (
                                    <li key={index}>{complemento.text}</li>
                                )
                            })}

                        </ul>
                    </div>
                </div>

                <div className="col-start-1 row-start-3 space-y-3 px-4 mt-2 md:mt-1 bg-none">
                    <Link to={{
                        pathname: `/habitaciones/${props.nombre}`,
                        state: {
                            props: props,
                            fotos: fotos,
                        }
                    }
                    }>
                        <button type="button" className="bg-blue-900 hover:bg-blue-700 text-white text-sm md:text-base font-semibold px-6 py-2 rounded-lg focus:outline-none focus:shadow-outline">
                            Mas Informacion
                            </button>
                    </Link>
                </div>

                <div className="col-start-1 row-start-1 flex md:col-start-2 md:row-span-3 bg-none">
                    <div className="w-full grid grid-cols-3 grid-rows-2 gap-2">
                        {
                            fotos.map((f, index) => {
                                return (<div className="relative md:block" key={index}>
                                    <img src={f} alt="foto" className="absolute inset-0 w-full h-full object-cover rounded-lg bg-gray-100" />
                                </div>)
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
