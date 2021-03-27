import React, { useState, useEffect } from 'react'
import { storage } from '../firebase';

export default function Platillo(props) {
    const [fotos, setFotos] = useState([])

    //Función asíncrona que descarga las fotos que están en el storage de la base de datos y que pertenecen a los platillos 
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
            <div class="sm:w-3/4 md:w-3/4 container mx-auto flex flex-col pb-5">
                <div class="grid md:grid-cols-2 sm:grid-cols-1 overflow-hidden bg-gray-100 rounded-lg shadow-lg mt-4 w-100 mx-2">
                    <div class="m-5 w-auto">
                        <img src={fotos[0]} alt="foto" className="object-contain h-48 w-full content-center rounded-lg bg-gray-100" />
                    </div>
                    <div class="w-full py-4 px-6 text-black flex flex-col justify-between">
                        <h3 class="font-semibold text-center text-2xl text-yellow-600 leading-tight truncate">{props.nombre}</h3>{/* Nombre*/}
                        <p class="mt-2 font-medium text-lg underline">
                            Detalles
                        </p>
                        <p>
                            {props.detalles.map(d => {
                                return (
                                    <div>
                                        <li>{d.text}</li>
                                    </div>
                                )
                            })}
                        </p>
                    
                        <p className="text-md text-center text-yellow-700 uppercase font-semibold mt-2">
                            Para más información ponte en contacto con nuestro personal
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
