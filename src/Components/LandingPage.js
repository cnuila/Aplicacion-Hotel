import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Iframe from 'react-iframe';
import Navbar from './Navbar';

import img_carousel_1 from '../imagenes/ban222.jpg';
import img_carousel_2 from '../imagenes/ban3.jpg';
import img_carousel_3 from '../imagenes/ban4.jpg';
import img_icono_wifi from '../imagenes/wifi.jpg';
import img_icono_carro from '../imagenes/carro.jpg';
import img_icono_ubicacion from '../imagenes/ubicacion.jpg';
import img_icono_piscina from '../imagenes/piscina.jpg';
import img_cuartos from '../imagenes/cuartos.jpg';
import img_salon from '../imagenes/salon.jpg';
import img_comida_1 from '../imagenes/ab4.jpg';
import img_comida_2 from '../imagenes/ab5.jpg';
import img_logo from '../imagenes/Logo.png';
import img_facebook from '../imagenes/facebook.png';

export default function Landing(){
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <Carousel autoPlay={2} infiniteLoop swipeable showThumbs={false} dynamicHeight={true} showStatus={false}>
                <div>
                    <img src={img_carousel_1} alt="Primera imagen"/>
                </div>
                <div>
                    <img src={img_carousel_2} alt="Segunda imagen"/>
                </div>
                <div>
                    <img src={img_carousel_3} alt="Tercera imagen"/>
                </div>
            </Carousel>
            <div class="xl:container mx-auto p-2 items-center">
                <h1 class="text-red-900 text-4xl text-center font-semibold">Hotel Posada del Ángel</h1>
                <div class="grid md:grid-cols-4 gap-4 sm:grid-col-2 ">
                    <div class="mt-5">
                        <img class="m-auto" src={img_icono_wifi} alt="Icono de WiFi" /> 
                        <p class="sm:text-lg text-center break-normal tracking-tighter">Conexión WiFi gratis para
                            los clientes hospedados.
                        </p> 
                    </div>
                    <div class="mt-5">
                        <img class="m-auto" src={img_icono_carro} alt="Icono de carro"/>
                        <p class="sm:text-lg text-center break-normal tracking-tighter">Parqueo gratis, privado
                            y seguro.
                        </p>
                    </div>
                    <div class="mt-5">
                        <img class="m-auto" src={img_icono_ubicacion} alt="Icono de ubicacion"/>
                        <p class="sm:text-lg text-center break-normal tracking-tighter">Ubicación en el centro de
                            Valle de Ángeles. 
                        </p>
                    </div>
                    <div class="mt-5">
                        <img class="m-auto" src={img_icono_piscina} alt="Icono de piscina"/>
                        <p class="sm:text-lg text-center break-normal tracking-tighter">Piscina privada dentro de las
                            instalaciones.
                        </p>
                    </div>
                </div>
            </div>
            <div class="mt- xl:container mx-auto p-2 bg-gray-900">
                <h1 class="mt-1 text-yellow-300 text-xl text-center font-semibold">Ofrecemos</h1>
                <h1 class="text-white text-4xl text-center font-semibold">Habitaciones sencillas, dobles y triples</h1>
                <img class="mt-2" src={img_cuartos} alt="Imagen cuartos" />
                <div class="grid grid-cols-1">
                    <button class="mt-2 justify-self-center bg-yellow-600 hover:bg-yellow-500 text-white text-xl font-bold p-4 rounded">
                        MÁS INFORMACIÓN
                    </button>
                </div>
            </div>
            <div class="mt-9 xl:container mx-auto bg-gray-300">
                <div class="grid md:grid-cols-2 sm:grid-cols-1">
                    <div class="flex-wrap">
                        <img class="mb-1 h-full w-full" src={img_salon} alt="Imagen del salón" />
                    </div>
                    <div class="mt-2">
                        <h1 class="text-black text-3xl sm:text-md text-center font-semibold">¿Necesitas organizar un evento?</h1>
                        <p class="m-10 text-xl text-center break-normal">Atención para seminarios de capacitación, eventos sociales, bodas,
                            incluyen banquete, decoración, luces, forros de sillas, centros de mesas, mantelería y mucho más.
                        </p>
                        <div class="flex justify-center">
                            <button class="mt-5 bg-yellow-600 hover:bg-yellow-500 text-white text-xl font-bold p-3 rounded">
                                MÁS INFORMACIÓN
                            </button>
                        </div> 
                    </div>
                </div>
            </div>
            <div class="mt-9 xl:container mx-auto bg-gray-300">
                <div class="grid md:grid-cols-3 sm:grid-cols-1">
                    <div class="flex-wrap">
                        <img class="mb-1 h-full w-full" src={img_comida_1} alt="Imagen de comida" />
                    </div>
                    <div class="mt-2">
                        <h1 class="text-black text-3xl sm:text-md text-center font-semibold">Restaurante</h1>
                        <p class="m-10 text-xl text-center break-normal">Te podemos preparar nuestra tradicional y sabrosa comida hondureña, además de la extranjera si quisieras adentrarte en sabores del exterior;
                            ambas con manos especializadas en la alta cocina.
                        </p>
                        <div class="flex justify-center">
                            <button class="mt-5 mb-2 bg-yellow-600 hover:bg-yellow-500 text-white text-xl font-bold p-3 rounded">
                                MÁS INFORMACIÓN
                            </button>
                        </div>
                    </div>
                    <div class="flex-wrap">
                        <img class="mb-1 h-full w-full" src={img_comida_2}  alt="Imagen de comida" />
                    </div>
                </div>
            </div>
            <div class="mt-9 mb-9 xl:container mx-auto p-2 bg-gray-900">
                <h1 class="mt-1 text-yellow-300 text-xl text-center font-semibold">Ubicación</h1>
                <h1 class="text-white text-4xl text-center font-semibold mb-4">¿Cómo nos puedes encontrar?</h1>
                <Iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1934.3074285689665!2d-87.04248922823774!3d14.158726185191815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6faf3855555555%3A0x23df6e20819ac5af!2sPosada%20del%20Angel!5e0!3m2!1ses-419!2shn!4v1606704703518!5m2!1ses-419!2shn" 
                    width="100%" height="450" frameborder="0" style={{border: "0"}} allowfullscreen="" aria-hidden="false" tabindex="0">
                </Iframe>
            </div>
            <nav class="bg-gray-900">
                <div class="container mx-auto">
                    <div class="flex flex-wrap overflow-hidden sm:-mx-1 md:-mx-px lg:-mx-2 xl:-mx-2">
                        <div class="w-full overflow-hidden sm:my-1 sm:px-1 sm:w-1/2 md:my-px md:px-px md:w-1/2 lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4 pb-6">
                            <img class="mb-1" src={img_logo}  alt="Logo" />
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
    )
}