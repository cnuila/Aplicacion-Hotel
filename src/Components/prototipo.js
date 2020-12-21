import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import hotel from "../imagenes/hotel.jpg"
import hotel1 from "../imagenes/hotel1.jpg"
import hotel2 from "../imagenes/hotel2.jpg"
import pool from "../imagenes/pool.jpg"
import { Link } from 'react-router-dom';

class prototipo extends Component{
    render(){
        
        return (            
            <div class="bg-gray-900 w-screen h-screen">
                <div class="md:container mx-auto p-2">
                    <h1 class="mt-1 text-yellow-300 text-4xl text-center font-semibold">Habitaciones</h1>
                    <h1 class="mt-7 mb-7 text-white text-xl text-center font-semibold">"Es malos modales hacer esperar unas vacaciones"</h1>
                </div>

                <div class="md:container md:mx-auto">
                        <div class="grid grid-cols-1 sm:grid-cols-2 sm:px-8 md:py-16 bg-local">
                            <div class="relative z-10 col-start-1 row-start-2 px-4 pb-3 bg-gradient-to-t from-black sm:bg-none">
                                <p class="text-sm font-medium text-white sm:mb-1 sm:text-white">Habitaciones</p>
                                <h2 class="text-xl font-semibold text-white sm:text-2xl sm:leading-7 sm:text-white md:text-3xl">Master Suite</h2>
                                <div class="flex items-center text-sm font-medium my-2 sm:mt-2 sm:mb-4 text-white">
                                    <svg width="20" height="20" fill="currentColor" class="text-violet-600">
                                        <path d="M9.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.784-.57-.381-1.81.587-1.81H7.03a1 1 0 00.95-.69L9.05 3.69z" />
                                    </svg>

                                    <div class="ml-1">
                                        <span class="text-white">4.94</span>
                                        <span class="text-white sm:hidden md:inline">(128)</span>
                                    </div>

                                    <div class="text-white text-base font-normal mx-2">·</div>
                                    <div>Valle de Angeles</div>
                                </div>

                                <p class="flex items-center text-white text-sm font-medium py-4">
                                Hotel Posada del Angel
                                </p> 

                                <button type="button" class="bg-green-500 hover:bg-green-700 text-white text-base font-semibold px-6 py-2 rounded-lg focus:outline-none focus:shadow-outline">
                                    <Link to="/habitaciones">Reservar</Link>
                                </button>
                            </div>

                            <div class="row-start-1 flex sm:col-start-2 sm:row-span-3 bg-none py-3">
                                <Carousel autoPlay={2} infiniteLoop swipeable showThumbs={false} dynamicHeight={true} showStatus={false}>
                                    <div>
                                        <img alt="" src={hotel}/>
                                    </div>
                                    <div>
                                        <img alt="" src={hotel1}/>
                                    </div>
                                    <div>
                                        <img alt="" src={hotel2}/>
                                    </div>
                                    <div>
                                        <img alt="" src={pool}/>
                                    </div>
                                </Carousel>
                            </div>
                        </div>
                </div>
            </div>

        );
    }
}

export default prototipo