import React, { useState } from 'react'


function DropdownDetalles({ detalles }) {

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(prevOpen => !prevOpen)
    }

    return (
        <>
            <div class="relative group inline-block">
                <div onClick={handleOpen} class="inline-flex justify-center w-full rounded-md shadow-sm px-40 py-2 bg-blue-900 text-sm font-medium text-white my-2">
                    Detalles Pasado
                    <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </div>

                <div class={open ? ("px-40 py-1 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5") : "hidden"}>
                    {
                        detalles.map((text) => {
                            return (
                                <a class="block px-12 flex text-sm text-black border-b-2 border-transparent hover:border-blue-800">{text}</a>
                            )
                        })
                    }
                </div>

            </div>
        </>
    )
}

export default DropdownDetalles