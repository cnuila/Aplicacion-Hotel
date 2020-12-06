import React from "react";
import imagen from "./ImagenFondo2.jpg"
import InputMask from "react-input-mask";
class Listar extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <body background={imagen} >
                <div class=" grid min-h-screen place-items-center">
                    <div class=" container mx-auto">
                        <div class="bg-white inputs w-full max-w-2xl p-6 mx-auto">
                            <h2 class="text-2xl text-gray-900">Configuracion de Cuenta</h2>
                            <form class="  mt-6 border-t border-gray-400 pt-4">
                                <div class='flex flex-wrap -mx-3 mb-6'>
                                    <div class='w-full md:w-full px-3 mb-6'>
                                        <label class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' for='grid-text-1'>Identidad</label>
                                        <InputMask mask="9999-9999-99999" name="Identidad" class='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='text' placeholder='ID' required/>
                                    </div>
                                    <div class='w-full md:w-full px-3 mb-6'>
                                        <label class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' for='grid-text-1'>Email</label>
                                        <input name="Email" class='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='text' placeholder='email' required>
                                        </input>
                                    </div>
                                    <div class='w-full md:w-full px-3 mb-6 '>
                                        <label class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Contraseña</label>
                                        <button class="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md ">Cambia tu contraseña ;)</button>
                                    </div>

                                    <div class="personal w-full border-t border-gray-400 pt-4">
                                        <h2 class="text-2xl text-gray-900">Información personal:</h2>
                                        <div class="flex items-center justify-between mt-4">
                                            <div class='w-full md:w-1/2 px-3 mb-6'>
                                                <label class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >Nombre</label>
                                                <InputMask mask="aaaaaaaaaaaaa"  name="Nombre" class='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='text' required />
                                                
                                            </div>
                                            <div class='w-full md:w-1/2 px-3 mb-6'>
                                                <label class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >Apellido</label>
                                                <InputMask mask="aaaaaaaaaaaaa" name="Apellido" class='appearance-none block w-full bg-white text-grnpm install react-input-maskay-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='text' required/>
                                               
                                            </div>
                                        </div>

                                        <div class="flex justify-end">
                                            <button class="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3" type="submit">Guardar Cambios</button>
                                        </div>
                                        <p class="text-right mt-4 text-xs text-gray-500  ">Al darle click a Guardar cambios, actualizaremos tus datos  </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </body>

        );

    }

}
export default Listar;