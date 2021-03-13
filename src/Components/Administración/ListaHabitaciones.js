import React, { useState, useEffect } from 'react'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { db, storage } from '../../firebase'
import { Calendar, utils } from "react-modern-calendar-datepicker";
import swal from 'sweetalert'
import moment from 'moment'
import AgregarHabitaciones from './AgregarHabitaciones'
import ModificarHabitacion from './ModificarHabitacion'
import ReseñasVisibles from './ReseñasVisibles'


export default function ListaHabitaciones() {

    const estadoInicial = {
        Nombre: "Nombre de la Habitación",
        Precio: 1000,
        Complementos: [{ id: 100, text: "Camas Dobles" }, { id: 200, text: "TV 55 pulgadas" }],
        Url: undefined,
        Cantidad: 5,
        Visible: "Si"
    }

    const [habitaciones, setHabitaciones] = useState([])
    const [habitacionSeleccionada, setHabitacionSeleccionada] = useState({ ...estadoInicial, Complementos: [...estadoInicial.Complementos] })
    const [diasReservados, setDiasReservados] = useState([])
    const [mostrarAgregar, setMostrarAgregar] = useState(false)
    const [mostrarModificar, setMostrarModificar] = useState(false)
    const [mostrarModificarReseñas, setMostrarModificarReseñas] = useState(false)
    const [check, setCheck] = useState()

    /*función que prepara todas las habitaciones para ser mostradas en la lista del panel izquierdo
        por cada habitación se hace el query para solicitar las reseñas que tiene esa habitación
    */
    const getHabitaciones = () => {
        db.collection("Habitaciones").onSnapshot((querySnapshot) => {
            const listaHabitaciones = []
            querySnapshot.forEach((doc) => {
                const listaReseñas = []
                db.collection("Habitaciones").doc(doc.id).collection("Reseñas").onSnapshot((querySnapshot2) => {
                    querySnapshot2.forEach((doc2) => {
                        listaReseñas.push({ ...doc2.data(), id: doc2.id })
                    })
                })
                listaHabitaciones.push({ ...doc.data(), id: doc.id, reseñas: listaReseñas })
            });
            setHabitaciones(listaHabitaciones)
        })
    }

    useEffect(() => {
        getHabitaciones()
    }, [])

    //función asíncrona que lee todas las reservas y deshabilita los días según su la cantidad de habitaciones disponibles
    const getReservas = async (id, cantidad) => {
        let cantidadHabitaciones = parseInt(cantidad)
        const fechasReservadas = []
        await db.collection("Reservas").where("idHabitacion", "==", id).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                //se guarda en fechasReservadas todas las fechas entre dos limites(fechaInicial-fechaFinal)
                let fechaFinal = new Date(doc.data().fechaFinal.seconds * 1000)
                let fechaInicial = new Date(doc.data().fechaInicial.seconds * 1000)
                let moment1 = moment(fechaInicial)
                let moment2 = moment(fechaFinal)
                let diferenciaDias = moment2.diff(moment1, 'days') + 1
                for (let i = 0; i < diferenciaDias; i++) {
                    fechasReservadas.push({
                        year: parseInt(moment1.format('YYYY')),
                        month: parseInt(moment1.format('MM')),
                        day: parseInt(moment1.format('D')),
                    })
                    //incrementar un dia
                    moment1.add(1, 'days')
                }
            })
        })

        //ordena las fechas según compare(leer compare para saber cómo ordena)
        const fechasOrdenadas = fechasReservadas.sort(compare)
        const nuevasFechas = []

        //por cada fecha en fechasOrdenadas si la fecha no está en nuevasFechas la agrega con cantidad 1
        //si la fecha ya está se incrementa la cantidad
        fechasOrdenadas.forEach(fecha1 => {
            for (let i = 0; i < fechasOrdenadas.length; i++) {
                if (fecha1.month === fechasOrdenadas[i].month && fecha1.year === fechasOrdenadas[i].year && fecha1.day === fechasOrdenadas[i].day) {
                    let index = nuevasFechas.findIndex(x => x.day === fecha1.day && x.month === fecha1.month && x.year === fecha1.year)
                    if (index === -1) {
                        nuevasFechas.push({ ...fecha1, cant: 1 })
                    } else {
                        let { cant } = nuevasFechas[index]
                        let nuevaCant = cant + 1
                        nuevasFechas[index] = { ...fecha1, cant: nuevaCant }
                    }
                    i = fechasOrdenadas.length
                }
            }
        })

        //por cada fecha en nuevasFechas, si la fecha tiene la misma cantidad que la cantidad de habitaciones
        //la fecha se deshabilita porque se concluye que las habitaciones en ese limite de fechas ya están reservadas
        const diasDeshabilitados = []
        nuevasFechas.forEach(fecha => {
            if (fecha.cant === cantidadHabitaciones) {
                diasDeshabilitados.push(fecha)
            }
        })
        setDiasReservados(diasDeshabilitados)
    }

    //función que recibe dos fechas y según el día ordena de manera no descendente
    const compare = (fecha1, fecha2) => {
        const dia1 = fecha1.day
        const dia2 = fecha2.day
        let comparador = 0
        if (dia1 > dia2) {
            comparador = 1
        } else {
            comparador = -1
        }
        return comparador
    }


    //funcion que recibe una habitacion y preparas sus datos para ser mostrados en el panel derecho
    const handleHabitacion = habitacion => {
        const { id, Nombre, Precio, Complementos, Url, reseñas, Cantidad, Visible } = habitacion
        setHabitacionSeleccionada({
            id,
            Nombre,
            Precio,
            Complementos,
            Url,
            reseñas,
            Cantidad,
            Visible
        })
        getReservas(id, Cantidad)
        setCheck(reseñas)
        setMostrarAgregar(false)
        setMostrarModificar(false)
        setMostrarModificarReseñas(false)
    }

    //función que prepara la interfaz para poder agregar una habitación
    const handleOnClickAgregar = () => {
        setMostrarAgregar(true)
        setHabitacionSeleccionada({ ...estadoInicial, Complementos: [...estadoInicial.Complementos] })
    }

    const handleEliminarHabitacion = async (id, fotos) => {
        let habitacion = db.collection("Habitaciones").doc(id)
        swal({
            title: "Esta seguro?",
            text: "La habitacion sera borrada permanentemente!",
            icon: "warning",
            buttons: {
                cancel: true,
                confirm: true,
            }
        }).then(async result => {
            if (result) {
                await habitacion.delete().then(() => {
                    if (fotos !== undefined) {
                        let deleteRef
                        for (let i = 0; i < fotos.length; i++) {
                            deleteRef = storage.refFromURL(fotos[i])
                            deleteRef.delete()
                        }
                    }
                }).then(() => {
                    swal({
                        text: "La Habitacion " + Nombre + " fue eliminada exitosamente",
                        icon: "success",
                        button: "Aceptar"
                    });
                    setHabitacionSeleccionada({ ...estadoInicial, Complementos: [...estadoInicial.Complementos] })
                    getHabitaciones()
                }).catch(function (error) {
                    swal({
                        icon: "error",
                        title: "Error al Eliminar",
                        text: "Error: " + error
                    })
                });
            } else {
                swal("Cancelado", "La habitacion no se borro");
            }
        });
    }

    const mostrarInicial = () => {
        setMostrarAgregar(false)
        setMostrarModificar(false)
        setMostrarModificarReseñas(false)
        setDiasReservados([])
        setHabitacionSeleccionada({ ...estadoInicial, Complementos: [...estadoInicial.Complementos] })
        getHabitaciones()
    }

    const handleOnClickModificar = () => {
        setMostrarModificar(true)
    }

    const handleOnClickModificarReseña = () => {
        setMostrarModificarReseñas(true)
    }

    const { id, Nombre, Precio, Complementos, Url, reseñas, Cantidad, Visible } = habitacionSeleccionada

    return (
        <div className="max-h-screen transform scale-0 sm:scale-100">
            <div className="grid grid-cols-3 bg-gray-100 max-h-screen min-h-screen">
                <div className="col-span-1 flex flex-col max-h-screen min-h-screen rounded-l-sm overflow-y-auto divide-y divide-gray-500 divide-opacity-50">
                    <div className="bg-gray-300 sticky z-10 opacity-95 top-0 rounded-t-md mx-1 mt-1 p-3">
                        <div className="relative grid text-center">
                            <div className="absolute p-1 place-self-end">
                                <svg className="fill-current mx-1 mt-1 cursor-pointer text-blue-500 hover:text-blue-600 h-5 w-5 place-self-center" onClick={handleOnClickAgregar} viewBox="0 0 426.667 426.667" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M405.332 192H234.668V21.332C234.668 9.559 225.109 0 213.332 0 201.559 0 192 9.559 192 21.332V192H21.332C9.559 192 0 201.559 0 213.332c0 11.777 9.559 21.336 21.332 21.336H192v170.664c0 11.777 9.559 21.336 21.332 21.336 11.777 0 21.336-9.559 21.336-21.336V234.668h170.664c11.777 0 21.336-9.559 21.336-21.336 0-11.773-9.559-21.332-21.336-21.332zm0 0" />
                                </svg>
                            </div>
                            <h2 className="font-bold text-lg">Habitaciones</h2>
                        </div>
                    </div>

                    {habitaciones.map((habitacion, index) => {
                        return (habitacionSeleccionada.Nombre === habitacion.Nombre ?
                            (<div key={index} className="mx-1 p-4 text-xs text-white font-semibold bg-gray-700 relative cursor-pointer" onClick={() => handleHabitacion(habitacion)}>
                                {habitacion.Nombre}
                            </div>)
                            :
                            (<div key={index} className="mx-1 p-4 text-xs font-semibold hover:bg-gray-200 relative cursor-pointer" onClick={() => handleHabitacion(habitacion)}>
                                {habitacion.Nombre}
                            </div>)
                        )
                    })}
                </div>
                <div className="flex col-span-2 max-h-screen min-h-screen overflow-y-auto rounded-r-sm justify-center">
                    {//se decide que renderizar de acuerdo a los estados mostrarAgregar, mostrarModificar,mostrarModificarReseñas
                        mostrarAgregar
                            ? (<AgregarHabitaciones mostrarInicial={mostrarInicial} habitaciones={habitaciones} />)
                            : mostrarModificar
                                ? <ModificarHabitacion nombre={habitacionSeleccionada.Nombre} mostrarInicial={mostrarInicial} habitaciones={habitaciones} />
                                : mostrarModificarReseñas
                                    ? <ReseñasVisibles reseña={check} id={id} mostrarInicial={mostrarInicial} nombre={habitacionSeleccionada.Nombre} />
                                    : (
                                        <div className="h-full w-10/12 px-20 py-8">
                                            <h1 className="font-bold text-center text-2xl mb-5 text-black m-3"> {Nombre} </h1>

                                            {Nombre !== "Nombre de la Habitación" ? (
                                                <div class="grid grid-cols-6 gap-x-2">
                                                    <div className="col-span-2">
                                                        <button className="bg-red-600 text-sm text-white h-10 w-full rounded-md" onClick={() => handleEliminarHabitacion(id, Url)}>
                                                            Eliminar Habitacion
                                                </button>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <button className="bg-blue-700 text-sm text-white h-10 w-full rounded-md" onClick={handleOnClickModificar}>
                                                            Modificar Habitacion
                                                </button>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <button className="bg-blue-700 text-sm text-white h-10 w-full rounded-md" onClick={handleOnClickModificarReseña}>
                                                            Modificar Reseñas
                                                </button>
                                                    </div>
                                                </div>) : (<></>)
                                            }

                                            {Visible
                                                ?
                                                <div className="bg-gray-300 h-20 my-4 py-4 px-6 rounded-md">
                                                    <h2 className="text-blue-500 font-semibold cursor-default">Visible</h2>
                                                    <h2 className="text-black pl-4">Si</h2>
                                                </div>

                                                :

                                                <div className="bg-gray-300 h-20 my-4 py-4 px-6 rounded-md">
                                                    <h2 className="text-blue-500 font-semibold cursor-default">Visible</h2>
                                                    <h2 className="text-black pl-4">No</h2>
                                                </div>
                                            }

                                            <div className="bg-gray-300 h-20 my-4 py-4 px-6 rounded-md">
                                                <h2 className="text-blue-500 font-semibold cursor-default">Precio</h2>
                                                <h2 className="text-black pl-4">Lps.{Precio}.00</h2>
                                            </div>
                                            <div className="bg-gray-300 h-20 my-4 py-4 px-6 rounded-md">
                                                <h2 className="text-blue-500 font-semibold cursor-default">Cantidad de Habitacones</h2>
                                                <h2 className="text-black pl-4">{Cantidad}</h2>
                                            </div>
                                            <div className="bg-gray-300 my-4 py-4 px-6 rounded-md">
                                                <h2 className="text-blue-500 font-semibold cursor-default">Complementos</h2>
                                                {
                                                    Complementos.map(complemento => {
                                                        const { text } = complemento
                                                        return <h2 className="text-black pl-4">{text}</h2>
                                                    })
                                                }
                                            </div>
                                            {Url !== undefined
                                                ? (<div className="bg-gray-300 my-4 py-4 px-6 rounded-md">
                                                    <h2 className="text-blue-500 font-semibold cursor-default mb-2">Fotos</h2>
                                                    <div className="grid grid-cols-2 place-items-center">
                                                        {
                                                            Url.map((foto, index) => {
                                                                return (
                                                                    <img key={index}
                                                                        className="h-40 w-40 p-2 object-cover rounded-xl"
                                                                        alt="Habitacion"
                                                                        src={foto}
                                                                    />)
                                                            })
                                                        }
                                                    </div>
                                                </div>)
                                                : <></>}
                                            {
                                                Nombre !== "Nombre de la Habitación" ?
                                                    (<div className="bg-gray-300 my-4 py-4 px-6 rounded-md">
                                                        <h2 className="text-blue-500 font-semibold cursor-default mb-2">Fechas Reservadas</h2>
                                                        <div className="grid place-items-center">
                                                            <Calendar
                                                                colorPrimaryLight="#60A5FA"
                                                                colorPrimary="#1E3A8A"
                                                                disabledDays={diasReservados}
                                                                minimumDate={utils().getToday()}
                                                                shouldHighlightWeekends
                                                            />
                                                        </div>
                                                    </div>) : <></>
                                            }
                                            {reseñas !== undefined && reseñas.length !== 0
                                                ? (<div className="bg-gray-300 my-4 py-4 px-6 rounded-md">
                                                    <h2 className="text-blue-500 font-semibold cursor-default mb-2">Reseñas</h2>
                                                    <div className="grid">
                                                        {
                                                            check.map(reseña => {
                                                                let text = "No"
                                                                if (reseña.visualizar) {
                                                                    text = "Sí"
                                                                }
                                                                return (
                                                                    <div className="ml-4 bg-gray-200 p-3 rounded-md my-1 overflow-x-auto" id={reseña.id}>
                                                                        <div className="flex flex-row">
                                                                            <h2 className="font-bold">Visible:</h2>
                                                                            <h2 className="px-1"> {text}</h2>
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
                                                    </div>
                                                </div>)
                                                : <></>}
                                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}