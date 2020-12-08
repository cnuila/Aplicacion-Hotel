import React, { Component } from 'react'
import Navbar from './Navbar';

class Conferencias extends Component{

    render(){
        return (
            <div>
                <Navbar/>
                <div class="bg-white text text-2xl md:text-3xl text-center mt-5 mb-3 font-bold">Salas de Conferencias</div>
                <div class = "bg-white flex flex-col md:flex-row border-b-2 border-gray-300 py-5 lg:py-4 px-2 lg:pr-24 items-center md:items-start md:justify-center space-x-0 md:space-x-10 space-y-2 md:space-y-0">
                    <img src ="#" class = "bg-blue-100 w-80 h-80 rounded" alt="Sala de conferencia"></img>
                    <img src ="#" class = "bg-blue-100 w-80 h-80 rounded md:order-last" alt="Sala de conferencia"></img>
                    <div class="flex flex-col w-80 space-y-3 justify-between">
                        <div class = "text-2xl font-semibold">Nombre de la sala</div>
                        <div class="">
                            Capacidad de 15 personas
                            con distancamiento social.
                        </div>
                        <div class = "text-gray-400">Extra información</div>
                    </div>
                </div>
                <div class = "bg-white flex flex-col md:flex-row border-b-2 border-gray-300 py-5 lg:py-4 px-2 lg:pr-24 items-center md:items-start md:justify-center space-x-0 md:space-x-10 space-y-2 md:space-y-0">
                    <img src ="#" class = "bg-blue-100 w-80 h-80 rounded" alt="Sala de conferencia"></img>
                    <img src ="#" class = "bg-blue-100 w-80 h-80 rounded md:order-last" alt="Sala de conferencia"></img>
                    <div class="flex flex-col w-80 space-y-3 justify-between">
                        <div class = "text-2xl font-semibold">Nombre de la sala</div>
                        <div class="">
                            Capacidad de 45 personas
                            con distancamiento social.
                        </div>
                        <div class = "text-gray-400">Extra información</div>
                    </div>
                </div>
                <div class = "bg-white flex flex-col md:flex-row border-b-2 border-gray-300 py-5 lg:py-4 px-2 lg:pr-24 items-center md:items-start md:justify-center space-x-0 md:space-x-10 space-y-2 md:space-y-0">
                    <img src ="#" class = "bg-blue-100 w-80 h-80 rounded" alt="Sala de conferencia"></img>
                    <img src ="#" class = "bg-blue-100 w-80 h-80 rounded md:order-last" alt="Sala de conferencia"></img>
                    <div class="flex flex-col w-80 space-y-3 justify-between">
                        <div class = "text-2xl font-semibold">Nombre de la sala</div>
                        <div class="">
                            Capacidad de 80 personas
                            con distancamiento social.
                        </div>
                        <div class = "text-gray-400">Extra información</div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Conferencias