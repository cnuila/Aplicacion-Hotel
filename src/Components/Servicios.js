import React, { Component } from 'react'
import hotel from "../imagenes/hotel.jpg"
import hotel1 from "../imagenes/hotel1.jpg"
import hotel2 from "../imagenes/hotel2.jpg"
import pool from "../imagenes/pool.jpg"
import pool1 from "../imagenes/pool1.jpg"
import pool2 from "../imagenes/pool2.jpg"
import rest from "../imagenes/rest.jpg"
import rest1 from "../imagenes/rest1.jpg"
import rest2 from "../imagenes/rest2.jpg"
import pro from "../imagenes/pro.jpg"
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

class Servicios extends Component{

    render(){
        return (
            /*style={{backgroundImage:`url(${hotel})`, opacity: .2}}*/
            <div>
                <div>
                    <Navbar/>
                </div>
                <div class="space-y-4 divide-y-2 divide-gray-400">
                    <div class="grid grid-cols-1 sm:grid-cols-2 sm:px-8 sm:py-12 sm:gap-x-8 md:py-16 bg-local">

                        <div class="relative z-10 col-start-1 row-start-1 px-4 pt-40 pb-3 bg-gradient-to-t from-black sm:bg-none">
                            <p class="text-sm font-medium text-white sm:mb-1 sm:text-black">Habitaciones</p>
                            <h2 class="text-xl font-semibold text-white sm:text-2xl sm:leading-7 sm:text-black md:text-3xl">Master Suite</h2>
                        </div>

                        <div class="col-start-1 row-start-2 px-4 sm:pb-16 bg-none">
                            <div class="flex items-center text-sm font-medium my-5 sm:mt-2 sm:mb-4 text-black">
                                <svg width="20" height="20" fill="currentColor" class="text-violet-600">
                                    <path d="M9.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.784-.57-.381-1.81.587-1.81H7.03a1 1 0 00.95-.69L9.05 3.69z" />
                                </svg>

                                <div class="ml-1">
                                    <span class="text-black">4.94</span>
                                    <span class="text-black sm:hidden md:inline">(128)</span>
                                </div>

                                <div class="text-black text-base font-normal mx-2">·</div>
                                <div>Valle de Angeles</div>
                            </div>
                            <hr class="w-16 border-gray-300 hidden sm:block" />
                        </div>

                        <div class="col-start-1 row-start-3 space-y-3 px-4 bg-none">
                            <p class="flex items-center text-white text-sm font-medium">
                                <img src={pro} alt="" class="w-6 h-6 rounded-full mr-2 bg-gray-100"/>
                            Hotel Posada del Angel
                            </p> 

                            <button type="button" class="bg-green-500 hover:bg-green-700 text-white text-base font-semibold px-6 py-2 rounded-lg focus:outline-none focus:shadow-outline">
                                <Link to="/habitaciones">Reservar</Link>
                            </button>
                        </div>

                        <div class="col-start-1 row-start-1 flex sm:col-start-2 sm:row-span-3 bg-none">
                            <div class="w-full grid grid-cols-3 grid-rows-2 gap-2">
                                <div class="relative col-span-3 row-span-2 md:col-span-2">
                                    <img src={hotel} alt="" class="absolute inset-0 w-full h-full object-cover bg-gray-100 sm:rounded-lg" />
                                </div>

                                <div class="relative hidden md:block">
                                    <img src={hotel1} alt="" class="absolute inset-0 w-full h-full object-cover rounded-lg bg-gray-100" />
                                </div>

                                <div class="relative hidden md:block">
                                    <img src={hotel2} alt="" class="absolute inset-0 w-full h-full object-cover rounded-lg bg-gray-100" />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="grid grid-cols-1 sm:grid-cols-2 sm:px-8 sm:py-12 sm:gap-x-8 md:py-16">
                        <div class="relative z-10 col-start-1 row-start-1 px-4 pt-40 pb-3 bg-gradient-to-t from-black sm:bg-none">
                            <p class="text-sm font-medium text-white sm:mb-1 sm:text-gray-500">Restaurante</p>
                            <h2 class="text-xl font-semibold text-white sm:text-2xl sm:leading-7 sm:text-black md:text-3xl">Nombre del Restaurante</h2>
                        </div>

                        <div class="col-start-1 row-start-2 px-4 sm:pb-16">
                            <div class="flex items-center text-sm font-medium my-5 sm:mt-2 sm:mb-4">
                                <svg width="20" height="20" fill="currentColor" class="text-violet-600">
                                    <path d="M9.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.784-.57-.381-1.81.587-1.81H7.03a1 1 0 00.95-.69L9.05 3.69z" />
                                </svg>

                                <div class="ml-1">
                                    <span class="text-black">4.94</span>
                                    <span class="sm:hidden md:inline">(128)</span>
                                </div>

                                <div class="text-base font-normal mx-2">·</div>
                                <div>Valle de Angeles</div>
                            </div>
                            <hr class="w-16 border-gray-300 hidden sm:block" />
                        </div>

                        <div class="col-start-1 row-start-3 space-y-3 px-4">
                            <p class="flex items-center text-black text-sm font-medium">
                                <img src={pro} alt="" class="w-6 h-6 rounded-full mr-2 bg-gray-100"/>
                            Hotel Posada del Angel
                            </p>

                            <button type="button" class="bg-green-500 hover:bg-green-700 text-white text-base font-semibold px-6 py-2 rounded-lg focus:outline-none focus:shadow-outline">
                                <Link to="/restaurante">Mas Detalles</Link>
                            </button>
                        </div>

                        <div class="col-start-1 row-start-1 flex sm:col-start-2 sm:row-span-3">
                            <div class="w-full grid grid-cols-3 grid-rows-2 gap-2">
                                <div class="relative col-span-3 row-span-2 md:col-span-2">
                                    <img src={rest1} alt="" class="absolute inset-0 w-full h-full object-cover bg-gray-100 sm:rounded-lg" />
                                </div>

                                <div class="relative hidden md:block">
                                    <img src={rest} alt="" class="absolute inset-0 w-full h-full object-cover rounded-lg bg-gray-100" />
                                </div>

                                <div class="relative hidden md:block">
                                    <img src={rest2} alt="" class="absolute inset-0 w-full h-full object-cover rounded-lg bg-gray-100" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 sm:px-8 sm:py-12 sm:gap-x-8 md:py-16">
                        <div class="relative z-10 col-start-1 row-start-1 px-4 pt-40 pb-3 bg-gradient-to-t from-black sm:bg-none">
                            <p class="text-sm font-medium text-white sm:mb-1 sm:text-gray-500">Entretenimiento</p>
                            <h2 class="text-xl font-semibold text-white sm:text-2xl sm:leading-7 sm:text-black md:text-3xl">Piscina</h2>
                        </div>

                        <div class="col-start-1 row-start-2 px-4 sm:pb-16">
                            <div class="flex items-center text-sm font-medium my-5 sm:mt-2 sm:mb-4">
                                <svg width="20" height="20" fill="currentColor" class="text-violet-600">
                                    <path d="M9.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.784-.57-.381-1.81.587-1.81H7.03a1 1 0 00.95-.69L9.05 3.69z" />
                                </svg>

                                <div class="ml-1">
                                    <span class="text-black">4.94</span>
                                    <span class="sm:hidden md:inline">(128)</span>
                                </div>

                                <div class="text-base font-normal mx-2">·</div>
                                <div>Valle de Angeles</div>
                            </div>
                            <hr class="w-16 border-gray-300 hidden sm:block" />
                        </div>

                        <div class="col-start-1 row-start-3 space-y-3 px-4">
                            <p class="flex items-center text-black text-sm font-medium">
                                <img src={pro} alt="" class="w-6 h-6 rounded-full mr-2 bg-gray-100"/>
                            Hotel Posada del Angel
                            </p>

                            <button type="button" class="bg-green-500 hover:bg-green-700 text-white text-base font-semibold px-6 py-2 rounded-lg focus:outline-none focus:shadow-outline">Mas Detalles</button>
                        </div>

                        <div class="col-start-1 row-start-1 flex sm:col-start-2 sm:row-span-3">
                            <div class="w-full grid grid-cols-3 grid-rows-2 gap-2">
                                <div class="relative col-span-3 row-span-2 md:col-span-2">
                                    <img src={pool} alt="" class="absolute inset-0 w-full h-full object-cover bg-gray-100 sm:rounded-lg" />
                                </div>

                                <div class="relative hidden md:block">
                                    <img src={pool1} alt="" class="absolute inset-0 w-full h-full object-cover rounded-lg bg-gray-100" />
                                </div>

                                <div class="relative hidden md:block">
                                    <img src={pool2} alt="" class="absolute inset-0 w-full h-full object-cover rounded-lg bg-gray-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="space-y-4 "/>
                </div>
            </div>
        );
    }

}

export default Servicios