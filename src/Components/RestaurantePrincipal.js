import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import img_restaurante_1 from '../imagenes/restaurante1.jpg'
import img_restaurante_2 from '../imagenes/restaurante2.jpg'
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

export default function RestaurantePrincipal(){
    return(
        <div>
            <Navbar/>
        <div class="bg-gray-900">
            <div class="md:container mx-auto p-2">
                <h1 class="mt-1 text-yellow-300 text-4xl text-center font-semibold">Restaurante</h1>
                <h1 class="mt-7 mb-7 text-white text-xl text-center font-semibold">Ven a disfrutar de nuestra deliciosa comida</h1>
                <div class="xl:container mx-auto">
                    <Carousel autoPlay={2} infiniteLoop swipeable showThumbs={false} dynamicHeight={false} showStatus={false} class="mb-5">
                        <div>
                            <img src={img_restaurante_1} alt="Primera imagen del restaurante"/>
                        </div>
                        <div>
                            <img src={img_restaurante_2} alt="Segunda imagen del restaurante"/>
                        </div>
                        
                    </Carousel>
                </div>
                
                <div class="mt-12 md:container md:mx-auto">
                    <div class="grid md:grid-cols-2 gap-x-2">
                        <div class="py-4">
                            <p class="mb-2 text-center text-lg text-white font-bold tracking-wide">Conoce nuestro menú</p>
                            <div class="h-96 shadow-lg group container rounded-md bg-white max-w-sm flex justify-center items-center  mx-auto content-div">
                                <div>
                                    <div class="h-96 w-full image-cover rounded-t-md"/>
                                </div>
                                <div class="absolute opacity-0 fd-sh group-hover:opacity-100"> 
                                    <div class="pt-8 text-center">
                                        <Link to="/menu">
                                        <button class="text-center rounded-lg p-4 bg-white  text-gray-700 font-bold text-lg cursor-pointer button">Ver más</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div class="py-8 px-4 rounded-b-md fd-cl group-hover:opacity-25">
                            </div>
                        </div>

                        <div class="py-4">
                            <p class="mb-2 text-center text-lg text-white font-bold tracking-wide">Servicio de restaurante</p>
                            <div class="h-96 shadow-lg group container  rounded-md bg-white  max-w-sm flex justify-center items-center  mx-auto content-div">
                                <div>
                                    <div class="h-96 w-full image-cover rounded-t-md"/>
                                </div>

                                <div class="absolute opacity-0 fd-sh group-hover:opacity-100"> 
                                    <div class="pt-8 text-center">
                                        <button class="text-center rounded-lg p-4 bg-white  text-gray-700 font-bold text-lg cursor-pointer button">Ver más</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}