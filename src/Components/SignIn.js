import React from "react";

class SingIn extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <body  background="https://get.wallhere.com/photo/sea-bay-beach-Tourism-hotel-swimming-pool-resort-lagoon-pier-Caribbean-vacation-estate-leisure-ocean-186672.jpg" >
                <div class="grid min-h-screen place-items-center" >
                    <div class="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
                        <form class="mt-6">
                            <div class="flex justify-between gap-3">
                                <span class="w-1/2">
                                    <label for="Nombre" class="block text-xs font-semibold text-gray-600 uppercase">Nombre</label>
                                    <input id="Nombre" type="text" name="Nombre" placeholder="Juan" autocomplete="given-name" class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                                </span>
                                <span class="w-1/2">
                                    <label for="Apellido" class="block text-xs font-semibold text-gray-600 uppercase">Apellido</label>
                                    <input id="Apellido" type="text" name="Apellido" placeholder="Perez" autocomplete="family-name" class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                                </span>
                                <span class="w-1/2">
                                    <label for="Identidad" class="block text-xs font-semibold text-gray-600 uppercase">Identidad</label>
                                    <input id="Identidad" type="text" name="Identidad" placeholder="0000-0000-0000"  class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                                </span>
                            </div>
                            <label for="email" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">E-mail</label>
                            <input id="email" type="email" name="email" placeholder="john.doe@company.com" autocomplete="email" class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                            <label for="password" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Contraseña</label>
                            <input id="password" type="password" name="password" placeholder="********" autocomplete="new-password" class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                            <label for="password-confirm" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Confirma Contraseña</label>
                            <input id="password-confirm" type="password" name="password-confirm" placeholder="********" autocomplete="new-password" class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                            <button type="submit" class="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                                Registrate
                            </button>
                            <p class="flex justify-between inline-block mt-4 text-xs text-gray-500 cursor-pointer hover:text-black"> ¿Ya estás registrado?</p>
                        </form>
                    </div>
                </div>
                </body>
            
        );
    }
}
export default SingIn;