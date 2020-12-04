import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import hotel from "../hotel.jpg"
import hotel1 from "../hotel1.jpg"
import hotel2 from "../hotel2.jpg"
import pool from "../pool.jpg"

class prototipo extends Component{

    render(){
        return (            
            <div class="bg-gray-900">
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

                <div class="py-4"/>

                <div class="md:container md:mx-auto">
                    <div class="grid md:grid-cols-3 gap-x-2">
                        <div class="py-4">
                            <div class="h-96 shadow-lg group container rounded-md bg-white max-w-sm flex justify-center items-center  mx-auto content-div">
                                <div>
                                    <div class="h-96 w-full image-cover rounded-t-md"/>
                                </div>

                                <div class="absolute opacity-0 fd-sh group-hover:opacity-100"> 
                                    <div class="pt-8 text-center">
                                        <button class="text-center rounded-lg p-4 bg-white  text-gray-700 font-bold text-lg cursor-pointer button">Ver mas</button>
                                        
                                        <div class="object p-4 mt-4 shadow-xl">
                                            <div class="max-w-sm rounded">
                                                <div class="px-6 py-4">
                                                    <div class="font-bold text-xl mb-2">Habitacion Sencilla</div>
                                                    <p class="text-gray-700 text-base">
                                                        1 Cama King
                                                    </p>
                                                    <p class="text-gray-700 text-base">
                                                        1 Baño
                                                    </p>
                                                    <p class="text-gray-700 text-base">
                                                        Tv
                                                    </p>
                                                    <p class="text-gray-700 text-base">
                                                        Aire Acondicionado
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="py-8 px-4 rounded-b-md fd-cl group-hover:opacity-25">
                                <span class="block text-center text-lg text-white font-bold tracking-wide">Sencilla</span>
                            </div>
                        </div>

                        <div class="py-4">
                            <div class="h-96 shadow-lg group container  rounded-md bg-white  max-w-sm flex justify-center items-center  mx-auto content-div">
                                <div>
                                    <div class="h-96 w-full image-cover rounded-t-md"/>
                                </div>

                                <div class="absolute opacity-0 fd-sh group-hover:opacity-100"> 
                                    <div class="pt-8 text-center">
                                        <button class="text-center rounded-lg p-4 bg-white  text-gray-700 font-bold text-lg cursor-pointer button">Ver mas</button>
                                        
                                        <div class="object p-4 mt-4 shadow-xl">
                                            <div class="max-w-sm rounded">
                                                <div class="px-6 py-4">
                                                    <div class="font-bold text-xl mb-2">Habitacion Doble</div>
                                                    <p class="text-gray-700 text-base">
                                                        2 Camas Matrimoniales
                                                    </p>
                                                    <p class="text-gray-700 text-base">
                                                        1 Baño
                                                    </p>
                                                    <p class="text-gray-700 text-base">
                                                        Tv
                                                    </p>
                                                    <p class="text-gray-700 text-base">
                                                        Aire Acondicionado
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="py-8 px-4 rounded-b-md fd-cl group-hover:opacity-25">
                                <span class="block text-center text-lg text-white font-bold tracking-wide">Doble</span>
                            </div>
                        </div>

                        <div class="py-4">
                            <div class="h-96 shadow-lg group container  rounded-md bg-white  max-w-sm flex justify-center items-center  mx-auto content-div">
                                <div>
                                    <div class="h-96 w-full image-cover rounded-t-md"/>
                                </div>

                                <div class="absolute opacity-0 fd-sh group-hover:opacity-100"> 
                                    <div class="pt-8 text-center">
                                        <button class="text-center rounded-lg p-4 bg-white  text-gray-700 font-bold text-lg cursor-pointer button">Ver mas</button>
                                        
                                        <div class="object p-4 mt-4 shadow-xl">
                                            <div class="max-w-sm rounded">
                                                <div class="px-6 py-4">
                                                    <div class="font-bold text-xl mb-2">Habitacion Triple</div>
                                                    <p class="text-gray-700 text-base">
                                                        2 Camas Matrimoniales
                                                    </p>
                                                    <p class="text-gray-700 text-base">
                                                        1 Cama Personal
                                                    </p>
                                                    <p class="text-gray-700 text-base">
                                                        1 Baño
                                                    </p>
                                                    <p class="text-gray-700 text-base">
                                                        Tv
                                                    </p>
                                                    <p class="text-gray-700 text-base">
                                                        Aire Acondicionado
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="py-8 px-4 rounded-b-md fd-cl group-hover:opacity-25">
                                <span class="block text-center text-lg text-white font-bold tracking-wide">Triple</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container flex flex-wrap pt-4 pb-10 m-auto mt-6 md:mt-15 lg:px-12 xl:px-16">
                    <div class="w-full px-0 lg:px-4">
                        <h2 class="px-12 text-base font-bold text-center md:text-2xl text-white">
                            Escoge tu habitacion
                        </h2>
                        <p class="py-1 text-sm text-center text-white mb-10">
                            "Es malos modales hacer esperar unas vacaciones"
                        </p>

                        <div class="flex flex-wrap items-center justify-center py-4 pt-0">
                            <div class="w-full p-4 md:w-1/2 lg:w-1/4 plan-card">
                                <label class="flex flex-col rounded-lg shadow-lg group relative cursor-pointer hover:shadow-2xl">
                                    <div class="w-full px-4 py-6 rounded-t-lg card-section-1 bg-blue-100 hover:bg-blue-500">
                                        <h3 class="mx-auto text-base font-semibold text-center underline text-blue-500 group-hover:text-blue-100">
                                            Sencilla
                                        </h3>
                                        <p class="text-5xl font-bold text-center group-hover:text-white text-blue-500">
                                            $25.<span class="text-3xl">95</span>
                                        </p>
                                    </div>
                                    <div class="flex flex-col items-center justify-center w-full h-full py-6 rounded-b-lg bg-blue-500"> 
                                        <button class="w-5/6 py-2 mt-2 font-semibold text-center uppercase bg-white border border-transparent rounded text-blue-500">
                                            Reservar
                                        </button>
                                    </div>
                                </label>
                            </div>

                            <div class="w-full p-4 md:w-1/2 lg:w-1/4">
                                <label class="flex flex-col rounded-lg shadow-lg relative cursor-pointer hover:shadow-2xl">
                                    <div class="w-full px-4 py-8 rounded-t-lg bg-blue-500 hover:bg-blue-700">
                                        <h3 class="mx-auto text-base font-semibold text-center underline text-white group-hover:text-white">
                                            Doble
                                        </h3>
                                        <p class="text-5xl font-bold text-center text-white">
                                            $21.<span class="text-3xl">95</span>
                                        </p>
                                    </div>

                                    <div class="flex flex-col items-center justify-center w-full h-full py-6 rounded-b-lg bg-blue-700">
                                        <button class="w-5/6 py-2 mt-2 font-semibold text-center uppercase bg-white border border-transparent rounded text-blue-500">
                                            Reservar
                                        </button>
                                    </div>
                                </label>
                            </div>

                            <div class="w-full p-4 md:w-1/2 lg:w-1/4 plan-card">
                                <label class="flex flex-col rounded-lg shadow-lg group relative cursor-pointer hover:shadow-2xl">
                                    <div class="w-full px-4 py-6 rounded-t-lg card-section-1 bg-blue-100 hover:bg-blue-500">
                                        <h3 class="mx-auto text-base font-semibold text-center underline text-blue-500 group-hover:text-blue-100">
                                            Triple
                                        </h3>
                                        <p class="text-5xl font-bold text-center group-hover:text-white text-blue-500">
                                            $19.<span class="text-3xl">95</span>
                                        </p>
                                    </div>
                                    <div class="flex flex-col items-center justify-center w-full h-full py-6 rounded-b-lg bg-blue-500"> 
                                        <button class="w-5/6 py-2 mt-2 font-semibold text-center uppercase bg-white border border-transparent rounded text-blue-500">
                                            Reservar
                                        </button>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default prototipo