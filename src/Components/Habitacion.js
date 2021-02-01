import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import hotel from "../imagenes/hotel.jpg"
import hotel1 from "../imagenes/hotel1.jpg"
import hotel2 from "../imagenes/hotel2.jpg"
import { Link } from 'react-router-dom';

export default function Habitacion() {
    return (
        <div className="grid grid-cols-1 m-3 md:m-6 sm:grid-cols-2 sm:px-8 sm:gap-x-8 pb-4 md:py-12  bg-local bg-gray-300 rounded-lg">

            <div className="relative z-10 col-start-1 row-start-1 px-4 pt-40 md:pt-20 pb-3 bg-gradient-to-t from-black sm:bg-none">
                <p className="text-sm font-medium text-white sm:mb-1 sm:text-black">Habitaciones</p>
                <h2 className="text-xl font-semibold text-white sm:text-2xl sm:leading-7 sm:text-black md:text-3xl">Master Suite</h2>
            </div>

            <div className="col-start-1 row-start-2 px-4 md:pb-10 bg-none">

                <div className="flex items-center text-sm font-medium mt-5 mb-3 sm:mt-2 sm:mb-2 text-black">
                    <svg className="fill-current h-6 w-6">
                        <path d="M9.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.784-.57-.381-1.81.587-1.81H7.03a1 1 0 00.95-.69L9.05 3.69z" />
                    </svg>

                    <div className="ml-1">
                        <span className="text-black">4.94</span>
                        <span className="text-black sm:hidden md:inline"> (128)</span>
                    </div>

                    <div className="text-black text-base font-normal mx-2">·</div>
                    <div>$$$</div>
                </div>
                <div className="text-sm font-medium text-black mt-2 mb-4 md:mt-6 md:mb-0">
                    <h2>Incluye:</h2>
                    <ul class="grid grid-cols-1 mt-2 lg:grid-cols-2 list-disc list-inside bg-rose-200 pl-4">
                        <li>2 camas dobles</li>
                        <li>1 cama unipersonales</li>
                        <li>2 camas dobles</li>
                        <li>1 cama unipersonales</li>
                    </ul>
                </div>
            </div>

            <div className="col-start-1 row-start-3 space-y-3 px-4 mt-2 md:mt-1 bg-none">
                <button type="button" className="bg-blue-900 hover:bg-blue-700 text-white text-sm md:text-base font-semibold px-6 py-2 rounded-lg focus:outline-none focus:shadow-outline">
                    <Link to="/habitaciones">Reservar</Link>
                </button>
            </div>

            <div className="col-start-1 row-start-1 flex md:col-start-2 md:row-span-3 bg-none">
                <div className="w-full grid grid-cols-3 grid-rows-2 gap-2">
                    <div className="relative col-span-3 row-span-2 md:col-span-2">
                        <img src={hotel} alt="" className="absolute inset-0 w-full h-full object-cover bg-gray-100 rounded-lg" />
                    </div>

                    <div className="relative hidden md:block">
                        <img src={hotel1} alt="" className="absolute inset-0 w-full h-full object-cover rounded-lg bg-gray-100" />
                    </div>

                    <div className="relative hidden md:block">
                        <img src={hotel2} alt="" className="absolute inset-0 w-full h-full object-cover rounded-lg bg-gray-100" />
                    </div>
                </div>
            </div>

            <div className="col-start-1 row-start-4 col-span-2 mt-5 bg-green-600">
                Aqui BRUNOOOOOOOOOOOOOOOOOO
            </div>
        </div>
    )
}
