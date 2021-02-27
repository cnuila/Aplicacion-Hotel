import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { storage } from '../firebase';

export default function Platillo(props) {
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
        <div class="bg-gray-800">
            <div class=" sm:w-3/4 md:w-3/4 container  lg:w-1/3 mx-auto flex flex-col  pb-2">
                <div v-for="card in cards" class=" flex flex-row md:flex-row overflow-hidden bg-white rounded-lg shadow-xl  mt-4 w-100 mx-2">
                    <div class="object-cover w-auto h-5/6">
                        <img src={fotos[0]} alt="foto" className="object-contain h-48 w-full content-center rounded-lg bg-gray-100" />
                    </div>
                    <div class="pl-8 w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
                        <h3 class="font-semibold text-lg leading-tight truncate">{props.nombre}</h3>{/* Nombre*/}
                        <p class="mt-2">
                            Detalles
                    {props.detalles.map(d => {
                            return (
                                <div>
                                    <li>{d.text}</li>
                                </div>
                            )
                        })}
                        </p>
                        <p className="text-md text-yellow-700 uppercase font-semibold mt-2">
                            Para más información llamar al hotel
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
