import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import menu from '../imagenes/menu.jpg'
import pastel from '../imagenes/pastel.png'
import meeting from '../imagenes/meeting.png'
import wedding from '../imagenes/wedding.png'

import Navbar from './Navbar';
import { Link } from 'react-router-dom';

export default function RestaurantePrincipal(){
    return(
        <div>
            <Navbar/>
            <div>
                <div class="bg-gray-900">
                <div class="container mx-auto">
                    <div class="grid md:grid-cols-2 sm:grid-cols-1">
                        <div class="flex-wrap">
                            <img class="mb-1 h-full w-full" src={menu} alt="Menu" />
                        </div>
                        <div class="mt-10 justify-center">
                            <h1 class="mt-12 text-yellow-500 text-4xl sm:text-md text-center font-semibold">Restaurante</h1>
                            <h1 class="mt-10 text-yellow-500 text-2xl sm:text-md text-center font-medium">Conoce, disfruta y prueba</h1>
                            <p class="m-12 text-white text-xl text-center break-normal">La mejor forma de comer comida saludable y tradicional.
                                Mira nuestro menú.
                            </p>
                        </div>
                    </div>
                </div> 
                </div>
                <div class="bg-gray-100">
                    <div class="container  mx-auto p-2">
                        <h1 class="mt-5 text-yellow-900 text-4xl text-center font-semibold">Nuestra comida es perfecta para cualquier ocasión</h1>
                        <div class="grid md:grid-cols-3 gap-4 sm:grid-col-2 ">
                            <div class="mt-5">
                                <img class="m-auto" src={pastel} alt="Icono de pastel" /> 
                                <p class="sm:text-lg text-center break-normal tracking-tighter">Cumpleaños</p> 
                            </div>
                            <div class="mt-5">
                                <img class="m-auto" src={meeting} alt="Icono de conferencia"/>
                                <p class="sm:text-lg text-center break-normal tracking-tighter">Conferencias</p>
                            </div>
                            <div class="mt-5">
                                <img class="m-auto" src={wedding} alt="Icono de boda"/>
                                <p class="sm:text-lg text-center break-normal tracking-tighter">Bodas</p>
                            </div>
                        </div>
                    </div>
                    <h1 class="mt-7 text-yellow-900 text-3xl text-center font-semibold">Conoce el platillo perfecto para cualquier evento</h1>
                    <div class="mt-5 mb-5 h-80 shadow-lg group container rounded-md bg-white max-w-sm flex justify-center items-center  mx-auto content-div">
                        <div class="absolute opacity-0 fd-sh group-hover:opacity-100"> 
                            <div class="pt-8 text-center">
                                <Link to="/menu">
                                    <button class="text-center rounded-lg p-4 bg-white  text-gray-700 font-bold text-lg cursor-pointer button">Ver más</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}