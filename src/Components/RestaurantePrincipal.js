import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PrismaZoom from 'react-prismazoom';


import menu from '../imagenes/menu.png'
import pastel from '../imagenes/pastel.png'
import meeting from '../imagenes/meeting.png'
import wedding from '../imagenes/wedding.png'
import img_logo from '../imagenes/hotel_posada.jpg';
import img_facebook from '../imagenes/facebook.png';
import imagen from '../imagenes/bebidas.jpg'

import Navbar from './Navbar';
import { db } from '../firebase'
import Platillo from './Platillo';

export default function RestaurantePrincipal(){
    const [platillos, setPlatillos] = useState([])

    //Función que recupera los platillos de la base de datos y los prepara para mostrarlos usando la función en Platillo.js  
    useEffect(() => {
        db.collection("Menu").onSnapshot((querySnapshot) => {
            const listaPlatillos = []
            querySnapshot.forEach((doc) => {
                listaPlatillos.push({ ...doc.data(), id: doc.id })
            });
            setPlatillos(listaPlatillos)
        })
    }, [])

    return(
        <div>
            <Navbar />
            <div>
                <div class="bg-gray-900 pt-4">
                    <div class="container mx-auto pb-5">
                        <h1 class="text-yellow-500 text-4xl sm:text-md text-center font-semibold">Restaurante</h1>
                        <h1 class="text-yellow-500 text-2xl sm:text-md text-center font-medium">Conoce, disfruta y prueba</h1>
                        <p class="m-5 text-white text-xl text-center break-normal">La mejor forma de comer comida saludable y tradicional.
                            Mira nuestro menú.
                        </p>
                        <div class="flex-wrap p-10 px-5 py-5 pb-5">
                            <p class="text-center text-white text-sm">*Puedes hacerle zoom usando la rueda de tu mouse, o pellizcando con dos dedos
                                , usando doble click o doble toque*
                            </p>
                            <PrismaZoom>
                                <div>
                                    <img class="mb-1" src={menu} alt="Menu" />
                                </div>
                            </PrismaZoom>
                        </div>

                    </div> 
                </div>
                <div>
                    <div>
                        <body background={imagen}>
                            <h1 class="text-white text-4xl text-center font-semibold">Nuestra comida es perfecta para cualquier ocasión</h1>
                            <div class="grid md:grid-cols-3 gap-4 sm:grid-col-2 ">
                                <div class="mt-10">
                                    <img class="m-auto" src={pastel} alt="Icono de pastel" /> 
                                    <p class="sm:text-lg text-white text-center break-normal tracking-tighter">Cumpleaños</p> 
                                </div>
                                <div class="mt-10">
                                    <img class="m-auto" src={meeting} alt="Icono de conferencia"/>
                                    <p class="sm:text-lg text-white text-center break-normal tracking-tighter">Conferencias</p>
                                </div>
                                <div class="mt-10">
                                    <img class="m-auto" src={wedding} alt="Icono de boda"/>
                                    <p class="sm:text-lg text-white text-center break-normal tracking-tighter">Bodas</p>
                                </div>
                            </div>
                            <h1 class="mt-10 text-white text-3xl text-center font-semibold">Conoce la bebida y el platillo perfecto para cualquier evento</h1>
                        </body>
                    </div>
                    <div class="bg-gray-900">
                        <div id="card">
                            {
                                platillos.map(p => {
                                    return (<div>
                                        <Platillo nombre={p.Nombre} url={p.Url} detalles={p.Detalles}  />
                                    </div>)
                                })
                            }
                        </div>
                    </div>
                    <nav class="bg-gray-800">
                        <div class="container">
                            <div class="flex flex-wrap overflow-hidden sm:-mx-1 md:-mx-px lg:-mx-2 xl:-mx-2">
                                <div class="w-full overflow-hidden sm:my-1 sm:px-1 sm:w-1/2 md:my-px md:px-px md:w-1/2 lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4 pb-6">
                                    <img class="mt-10 mb-1" src={img_logo}  alt="Logo" />
                                </div>
                                <div class="w-full overflow-hidden sm:my-1 sm:px-1 sm:w-1/2 md:my-px md:px-px md:w-1/2 lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4 pb-6">
                                    <h4 class="text-white text-center mt-2">Contáctanos</h4>
                                    <ul class="flex justify-center">
                                        <li class="leading-7 text-sm flex">
                                            <a class="text-white underline text-small" href="https://www.facebook.com/posadadelangelhonduras">
                                                <img src={img_facebook}  alt="facebook" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="w-full overflow-hidden sm:my-1 sm:px-1 sm:w-1/2 md:my-px md:px-px md:w-1/2 lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4 pb-6">

                                    <h4 class="text-white text-center">Teléfonos</h4>
                                    <ul class="flex justify-center">
                                        <li id="navi-2" class="leading-7 text-sm">
                                            <p class="text-yellow-300">+504 2766-2233</p>
                                            <p class="text-yellow-300">+504 2766-2596</p>
                                            <p class="text-yellow-300">+504 2766-2875</p>
                                            <p class="text-yellow-300">+504 3180-1971</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}