import React from 'react'
import menuIcon from '../assets/Hamburger_icon.png'

const Navbar = () =>{
    return(
        <div>
            <header class="lg:px-16 px-6 bg-white flex flex-wrap items-center lg:py-0 py-2">
                <div class="flex-1 flex justify-between items-center">
                    <a href="#">Logo y Nombre</a>
                </div>
                <label for="menu-toggle" class="pointer-cursor lg:hidden block">
                    <img src={menuIcon} class="fill-current text-gray-900 w-10 h-10" alt="Menu"></img>
                </label>
                <input type="checkbox" class="hidden" id="menu-toggle"/>

                <div class="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
                    <nav>
                        <ul class ="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
                            <li>
                                <a href="#" class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400">Item 1</a>
                            </li>
                            <li>
                                <a href="#" class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400">Item 2</a>
                            </li>
                            <li>
                                <a href="#" class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400">Item 3</a>
                            </li>
                            <li>
                                <a href="#" class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400">Item 4</a>
                            </li>
                        </ul>
                    </nav>
                    <a href="#" class="lg:ml-4 flex items-center justify-start lg:mb-0 mb-4 cursor-pointer">
                        <img src="" class="rounded-full w-10 h-10 border-2 border-transparent hover:border-indigo-400" alt="Profile"></img>
                    </a>
                </div>
            </header>
        </div>
    )
}

export default Navbar