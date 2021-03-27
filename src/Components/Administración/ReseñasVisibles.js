import React, { useState, useEffect } from 'react'
import { db, storage } from '../../firebase'
import swal from 'sweetalert'
import PreviousMap from 'postcss/lib/previous-map'

export default function ReseñasVisibles(props) {

    const [check, setCheck] = useState([])

    const handleCheckbox = (e) => {
        let lista = []
        let nombre = e.target.id
        for (let index = 0; index < check.length; index++) {
            const element = check[index];
            if (element.id === nombre) {
                let temp = { id: element.id, comentario: element.comentario, rating: element.rating, usuario: element.usuario, visualizar: !element.visualizar };
                lista.push(temp)
            } else {
                lista.push(element)
            }
        }

        setCheck(lista)
    }

    const handleUpload = (e) => {
        e.preventDefault()

        check.map(doc => {
            db.collection("Habitaciones").doc(props.id).collection("Reseñas").doc(doc.id).set({
                comentario: doc.comentario,
                rating: doc.rating,
                visualizar: doc.visualizar,
                usuario: doc.usuario,
            }).then(() => {
                alertaSuccess()
                props.mostrarInicial()
            }).catch(() => {
            })
        })
    }

    const alertaSuccess = () => {
        swal({
            text: "Las Reseñas fueron modificadas exitosamente",
            icon: "success",
            button: "Aceptar"
        });
    }

    useEffect(() => {
        setCheck(props.reseña)
    }, [])

    return (
        <div className="h-full w-10/12 px-20 py-8">
            <h1 className="font-bold text-center text-2xl mb-5 text-black m-3"> {props.nombre} </h1>

            <div className="bg-gray-100 my-4 py-4 px-6 rounded-md">
                <h2 className="text-blue-500 font-semibold cursor-default mb-2">Reseñas</h2>
                <div className="grid">
                    {
                        check.map(reseña => {

                            return (
                                <div className=" bg-gray-200 p-3 rounded-md my-1 overflow-x-auto" id={reseña.id}>
                                    <div className="flex flex-row">
                                        <h2 className="font-bold">Visible:</h2>
                                        <div>
                                            <input className="form-checkbox h-4 w-4 text-red-600" id={reseña.id} onChange={handleCheckbox} checked={reseña.visualizar} type="checkbox" id={reseña.id} />
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        <h2 className="font-bold">Rating:</h2>
                                        <h2 className="px-1"> {reseña.rating}</h2>
                                        <h2>de 5 estrellas</h2>
                                    </div>
                                    <div className="flex flex-row">
                                        <h2 className="font-bold">Comentario:</h2>
                                        <h2 className="pl-1"> {reseña.comentario}</h2>
                                    </div>
                                    <div className="flex flex-row">
                                        <h2 className="font-bold">Usuario:</h2>
                                        <h2 className="pl-1"> {reseña.usuario}</h2>
                                    </div>
                                </div>)
                        })
                    }
                    <button onClick={handleUpload} class="w-full py-3 mt-10 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">Modificar Reseñas</button>
                </div>
            </div>
        </div>
    )
}