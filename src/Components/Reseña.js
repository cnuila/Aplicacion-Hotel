import React, { useEffect, useState } from 'react'
import ReactStarRating from "react-star-ratings-component";
import { auth, db } from "../firebase"
import swal from 'sweetalert'

export default function Reseña(props) {

    const [usuario, setUsuario] = useState("")

    useEffect(() => {
        setTimeout(() => {
            let usuario = auth.currentUser
            if (usuario) {
                setUsuario(usuario.email)
            }
        }, 1000)
    }, [])

    const eliminarResena = (idResena) => {
        swal({
            title: "¿Seguro quieres eliminar tu reseña?",
            text: "Una vez la elimines, no podrás deshacer la acción",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((seElimina) => {
                if (seElimina) {
                    const { nombre } = props
                    db.collection("Habitaciones").doc(nombre).collection("Reseñas").doc(idResena).delete().then(() => {
                        swal("Se eliminó tu reseña", {
                            icon: "success",
                        });
                    })
                }
            });
    }
    console.log("se llamo")
    console.log(props)
    const { resena } = props
    return (
        <div className="">
            <div className="flex justify-center container w-full mx-auto py-12 px-4">
                <div className="  flex justify-center w-2/3  bg-gray-300 rounded-3xl border-blue-900 border shadow-lg pb-6 lg:pb-0">
                    <div className="w-full  p-4">
                        <div className="justify-items-center ">
                            <div className="grid grid-cols-2">
                                <h3 className="text-blue mx-7 font-semibold text-lg text-center md:text-left ">{resena.usuario} dice:</h3>
                                {usuario === resena.usuario
                                    ? <svg className="fill-current mx-2 h-5 w-5 place-self-end text-gray-600 hover:text-gray-400 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={() => {eliminarResena(resena.id)}}>
                                        <path d="M424 64h-88V48c0-26.51-21.49-48-48-48h-64c-26.51 0-48 21.49-48 48v16H88c-22.091 0-40 17.909-40 40v32c0 8.837 7.163 16 16 16h384c8.837 0 16-7.163 16-16v-32c0-22.091-17.909-40-40-40zM208 48c0-8.82 7.18-16 16-16h64c8.82 0 16 7.18 16 16v16h-96zM78.364 184a5 5 0 00-4.994 5.238l13.2 277.042c1.22 25.64 22.28 45.72 47.94 45.72h242.98c25.66 0 46.72-20.08 47.94-45.72l13.2-277.042a5 5 0 00-4.994-5.238zM320 224c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16zm-80 0c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16zm-80 0c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16z" />
                                    </svg>
                                    : <></>}
                            </div>
                            <div className="mx-5 mb-1">
                                <ReactStarRating numberOfStar={5} numberOfSelectedStar={resena.rating} colorFilledStar="yellow" colorEmptyStar="blue" starSize="25px" spaceBetweenStar="8px" disableOnSelect={true} />
                            </div>
                            <textarea name="comentario" value={resena.comentario} className="rounded-md bg-gray-200 text-xl leading-normal resize-none w-full h-20 py-2 px-3 font-medium text-gray-700 focus:outline-none "></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

/*<svg className="fill-current mx-2 h-5 w-5 self-center text-red-600 cursor-pointer" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" onClick={() => props.eliminarCancion(numCancion)}>
                    <path d="M256 0C114.836 0 0 114.836 0 256s114.836 256 256 256 256-114.836 256-256S397.164 0 256 0zm94.273 320.105c8.34 8.344 8.34 21.825 0 30.168a21.275 21.275 0 01-15.086 6.25c-5.46 0-10.921-2.09-15.082-6.25L256 286.164l-64.105 64.11a21.273 21.273 0 01-15.083 6.25 21.275 21.275 0 01-15.085-6.25c-8.34-8.344-8.34-21.825 0-30.169L225.836 256l-64.11-64.105c-8.34-8.344-8.34-21.825 0-30.168 8.344-8.34 21.825-8.34 30.169 0L256 225.836l64.105-64.11c8.344-8.34 21.825-8.34 30.168 0 8.34 8.344 8.34 21.825 0 30.169L286.164 256zm0 0" />
                </svg>*/