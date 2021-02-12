import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';
export default function MenuRestaurante({ history }) {

    return (
        <div>
            <Navbar />

            <div class="pt-6 pb-12 bg-gray-800">
                <div id="card" class="">
                    <h2 class="text-center font-serif text-yellow-400 uppercase text-4xl xl:text-5xl">Nuestros platillos</h2>
                    <div class=" sm:w-3/4 md:w-3/4 container w-100 lg:w-1/3 mx-auto flex flex-col">
                        {/**recorre card en cards para cargar cada plato, de que uuuuhhhh 
                         * 
                         *     
                        */}
                        <div v-for="card in cards" class="flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-xl  mt-4 w-100 mx-2">
                            <div class="h-64 w-auto ">
                                <img class="inset-0 h-full w-full object-cover object-center" src="https://i0.wp.com/www.marcahonduras.hn/wp-content/uploads/2019/06/Baleadas-1.jpg?fit=1920%2C1080&ssl=1" />
                            </div>
                            <div class="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
                                <h3 class="font-semibold text-lg leading-tight truncate">Baleadas con todo</h3>{/* Nombre*/}
                                <p class="mt-2">
                                    {/** descripcion */}
                                    Deliciosas baleadas con grijoles, aguacate, huevo, chorizo y mantequilla, hechas con tortilla recien hecha.</p>
                                <p class="text-md text-gray-700 uppercase tracking-wide font-semibold mt-2">
                                    {/** precio */}
                                    69 LPS.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}