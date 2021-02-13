import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';
import Reseña from './Reseña';
import Comentario from './Comentario';
import img_carousel_1 from '../imagenes/ban222.jpg';
import img_carousel_2 from '../imagenes/ban3.jpg';
import img_carousel_3 from '../imagenes/ban4.jpg';
import { Carousel } from 'react-responsive-carousel';

export default function InfoHabitacion({ location }) {
  const nombre = location.state.props.nombre
  const complementos = location.state.props.complementos
  const precio = location.state.props.precio
  const fotos = location.state.fotos
  const resena = location.state.props.resena
  const [value, onChange] = useState();
  return (
    <div>
      <Navbar />
      <body class="antialiased">
        <div class="py-6 bg-gray-200">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div class="flex flex-col md:flex-row -mx-4">
              <div class="md:flex-1 px-4">
                <div x-data="{ image: 1 }" x-cloak>
                  <div class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                    <div x-show="image === 1" class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                      <Carousel autoPlay={3} infiniteLoop swipeable showThumbs={false} dynamicHeight={true} showStatus={false}>

                        {/*fotos.map((f, index) => {
                          <div>
                            <img key={index} src={f} alt="foto" className="absolute inset-0 w-full h-full object-cover rounded-lg bg-gray-100" />
                          </div>
                        })*/}
                        <div>
                          <img src={fotos[0]} alt="" className="inset-0 w-64 h-72 object-cover rounded-lg bg-gray-100" />
                        </div>
                        <div>
                          <img src={fotos[1]} alt="" className="inset-0 w-64 h-72 object-cover rounded-lg bg-gray-100" />
                        </div>
                        <div>
                          <img src={fotos[2]} alt="" className="inset-0 w-64 h-72 object-cover rounded-lg bg-gray-100" />
                        </div>
                        <div>
                          <img src={fotos[3]} alt="" className="inset-0 w-64 h-72 object-cover rounded-lg bg-gray-100" />
                        </div>
                        <div>
                          <img src={fotos[4]} alt="" className="inset-0 w-64 h-72 object-cover rounded-lg bg-gray-100" />
                        </div>
                      </Carousel>
                    </div>
                  </div>
                  <div class="flex -mx-2 mb-4">
                    <template x-for="i in 4">
                      <div class="flex-1 px-2">
                        <button x-on click="image = i" class="{ 'ring-2 ring-indigo-300 ring-inset': image === i }" class="focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center">
                          <span x-text="i" class="text-2xl"></span>
                        </button>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
              <div class="md:flex-1 px-4">
                <h2 class="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{nombre}</h2>
                <div class="flex items-center space-x-4 my-4">
                  <div>
                    <div class="rounded-lg bg-gray-100 flex py-2 px-3">
                      <span class="text-indigo-400 mr-1 mt-1">Lps.</span>
                      <span class="font-bold text-indigo-600 text-3xl">{precio}</span>
                    </div>
                  </div>
                  <div class="flex-1">
                    {
                      //<p class="text-green-500 text-xl font-semibold">Descuento</p>
                      //<p class="text-gray-400 text-sm">Precio Por la Habitacion.</p>
                    }

                  </div>
                </div>
                <p class="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <div class="flex py-4 space-x-4">
                  <div>
                    {/* https://www.npmjs.com/package/@wojtekmaj/react-daterange-picker */}
                  </div>
                  <button type="button" class="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white">
                    Reservar
                  </button>
                </div>
              </div>
            </div>
            <div class=" w-1/2">

              {complementos.map(c => {
                return (
                  <div>
                    <p class="text-gray-500">
                      <li>{c.text}</li></p>
                  </div>
                )
              })}

            </div>
          </div>
          <div class=" mt-2 flex justify-center container w-full">
          </div>
        </div>
        <div class=" bg-indigo-700">

          {resena !== undefined ? (
            resena.map(r => {
              return (
                <Comentario resena={r} />
              )
            })) : (<>hi</>)
          }

          <Reseña nombre={nombre} resena={resena} />
        </div>
      </body>
    </div>
  )
}