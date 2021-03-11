import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { db } from '../firebase'

import menu from '../imagenes/menu.jpg'
import pastel from '../imagenes/pastel.png'
import meeting from '../imagenes/meeting.png'
import wedding from '../imagenes/wedding.png'

import Navbar from './Navbar';
import { Link } from 'react-router-dom';

export default function RestaurantePrincipal() {
    const [menus, setMenus] = useState([])

    useEffect(() => {
        db.collection("Menu").onSnapshot((querySnapshot) => {
            const listaMenus = []
            querySnapshot.forEach((doc) => {
                listaMenus.push({ ...doc.data(), id: doc.id })
            });
            setMenus(listaMenus)
        })
    }, [])

    return (
        <div>
            <Navbar />
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
                                <img class="m-auto" src={meeting} alt="Icono de conferencia" />
                                <p class="sm:text-lg text-center break-normal tracking-tighter">Conferencias</p>
                            </div>
                            <div class="mt-5">
                                <img class="m-auto" src={wedding} alt="Icono de boda" />
                                <p class="sm:text-lg text-center break-normal tracking-tighter">Bodas</p>
                            </div>
                        </div>
                    </div>
                    <h1 class="mt-7 text-yellow-900 text-3xl text-center font-semibold">Conoce el platillo perfecto para cualquier evento</h1>
                    <div className="grid grid-cols-3 ">
                        {
                            menus.map(platillo => {
                                if (platillo.Visible) {
                                    return (
                                        /*{<div class="bg-local mt-5 mb-5 h-80 shadow-lg group container rounded-md bg-white max-w-sm flex justify-center items-center  mx-auto"
                                            style={{
                                                backgroundImage: 'url(' + platillo.Url + ')'
                                            }} />}*/

                                        <div class="flex my-10">
                                            <div class="bg-white w-10/12 m-auto border-1 border-gray-100 shadow-md  overflow-hidden">
                                                <img src={platillo.Url} alt="" class="w-full object-cover object-center" />
                                                <div class="p-4">
                                                    <p class="mb-1 text-gray-900 font-semibold">Card Title</p>

                                                    <span class="text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi fugit hic ab quos eos
          quisquam labore minus, dignissimos porro explicabo distinctio.</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}