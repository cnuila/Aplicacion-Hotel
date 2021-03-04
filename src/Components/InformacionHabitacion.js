import React, { useState, useEffect } from 'react'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, utils } from "react-modern-calendar-datepicker";
import swal from 'sweetalert'
import { db, auth } from "../firebase"
import moment from 'moment'
import Navbar from './Navbar';
import Reseña from './Reseña';
import { Carousel } from 'react-responsive-carousel';
import CrearReseña from './CrearReseña';

export default function InfoHabitacion({ location, history }) {
  const nombre = location.state.props.nombre
  const complementos = location.state.props.complementos
  const precio = location.state.props.precio
  const fotos = location.state.fotos
  const [reseñas, setReseña] = useState([])
  const [diasReservados, setDiasReservados] = useState([])
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null
  });

  useEffect(() => {
    getReservas()
    getReseñas()
  }, [])

  const getReseñas = () => {
    db.collection("Habitaciones").doc(nombre).collection("Reseñas").orderBy("rating", "desc").get().then(querySnapshot => {

      const listaReseñas = []
      querySnapshot.forEach((doc) => {
        listaReseñas.push({ ...doc.data(), id: doc.id })
      })
      setReseña(listaReseñas)
    })


  }

  const getReservas = () => {
    db.collection("Reservas").where("idHabitacion", "==", nombre).get().then(async querySnapshot => {
      let cantidadHabitaciones = 0
      await db.collection("Habitaciones").where("Nombre", "==", nombre).get().then(querySnapshot2 => {
        querySnapshot2.forEach((habitacion) => {
          cantidadHabitaciones = habitacion.data().Cantidad
        })
      })
      console.log(cantidadHabitaciones)
      const diasReservados = []
      /*querySnapshot.forEach((doc) => {
        let fechaFinal = new Date(doc.data().fechaFinal.seconds * 1000)
        let fechaInicial = new Date(doc.data().fechaInicial.seconds * 1000)
        let moment1 = moment(fechaInicial)
        let moment2 = moment(fechaFinal)
        let diferenciaDias = moment2.diff(moment1, 'days') + 1
        for (let i = 0; i < diferenciaDias; i++) {
          diasReservados.push({
            year: parseInt(moment1.format('YYYY')),
            month: parseInt(moment1.format('MM')),
            day: parseInt(moment1.format('D')),
            cantidad:
          })
          //incrementar un dia
          moment1.add(1, 'days')
        }
      })*/
      const diasDeshabilitados = []
      querySnapshot.forEach((doc) => {
        let fechaFinal = new Date(doc.data().fechaFinal.seconds * 1000)
        let fechaInicial = new Date(doc.data().fechaInicial.seconds * 1000)
        let moment1 = moment(fechaInicial)
        let moment2 = moment(fechaFinal)
        let diferenciaDias = moment2.diff(moment1, 'days') + 1
        for (let i = 0; i < diferenciaDias; i++) {
          diasDeshabilitados.push({
            year: parseInt(moment1.format('YYYY')),
            month: parseInt(moment1.format('MM')),
            day: parseInt(moment1.format('D')),
          })
          //incrementar un dia
          moment1.add(1, 'days')
        }
      })
      setDiasReservados(diasDeshabilitados)
    })
  }

  const handleDisabledSelect = () => {
    swal({
      text: "Intentaste elegir un día ya reservado",
      icon: "warning",
      button: "Aceptar"
    });
  };

  const reservar = async () => {
    const user = auth.currentUser;
    if (user) {
      if (selectedDayRange.to === null && selectedDayRange.from === null) {
        swal({
          text: "Debes seleccionar una fecha primero",
          icon: "warning",
          button: "Aceptar"
        });
      } else {
        if (selectedDayRange.to === null && selectedDayRange.from !== null) {
          swal({
            text: "Debes seleccionar una fecha final o darle click de nuevo al día si solo quieres reservar un día",
            icon: "warning",
            button: "Aceptar"
          });
        } else {
          let idCliente = ""
          await db.collection("Usuarios").where("Email", "==", user.email).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              idCliente = doc.id;
            })
          })
          if (idCliente === "") {
            swal({
              text: "No tenemos registrado tu ID, elimina tu cuenta, y asegúrate de terminar el proceso de registro",
              icon: "warning",
              button: "Aceptar"
            });
          } else {
            const { to, from } = selectedDayRange
            let emailCliente = user.email
            let fechaFinal = new Date(to.year, to.month - 1, to.day)
            let fechaInicial = new Date(from.year, from.month - 1, from.day)
            let moment1 = moment(fechaInicial)
            let moment2 = moment(fechaFinal)
            let diferenciaDias = moment2.diff(moment1, 'days') + 1
            let precioPagar = precio * diferenciaDias
            db.collection("Reservas").add({
              idHabitacion: nombre,
              idCliente,
              emailCliente,
              fechaFinal,
              fechaInicial,
              precioPagar,
              pagada: false,
            }).then(() => {
              swal({
                text: "Reservaste con éxito",
                icon: "success",
                button: "Aceptar"
              }).then(() => {
                history.push("/misReservas");
              });
            })
          }
        }
      }
    } else {
      swal({
        text: "Debes iniciar sesión para hacer una reseña",
        icon: "warning",
        button: "Aceptar"
      });
    }
  }


  return (
    <div>
      <Navbar />
      <body class="antialiased">
        <div class="py-6 bg-gray-200">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div class="flex flex-col md:flex-row -mx-4">
              <div class="md:flex-1 px-4">
                <div class="rounded-lg bg-gray-100 mb-4">
                  <Carousel autoPlay infiniteLoop swipeable showThumbs={false} dynamicHeight={true} showStatus={false}>
                    {fotos.map((url, index) => {
                      return (<div key={index}>
                        <img src={url} alt="foto" />
                      </div>)
                    })}
                  </Carousel>
                </div>
              </div>
              <div class="md:flex-1 px-4">
                <h2 class="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{nombre}</h2>
                <div class="flex items-center space-x-4 my-4">
                  <div>
                    <div class="rounded-lg bg-gray-100 flex py-2 px-3">
                      <span class="text-blue-700 mr-1 mt-1">Lps.</span>
                      <span class="font-bold text-blue-900 text-3xl">{precio}.00</span>
                    </div>
                  </div>
                  <button type="button" class="h-14 px-6 py-2 font-semibold rounded-xl bg-blue-900 hover:bg-blue-800 text-white outline-none focus:outline-none" onClick={() => reservar()}>
                    Reservar
                  </button>
                  <div class="flex-1">
                    {
                      //<p class="text-green-500 text-xl font-semibold">Descuento</p>
                      //<p class="text-gray-400 text-sm">Precio Por la Habitacion.</p>
                    }

                  </div>
                </div>
                <div class="flex py-4 space-x-4">
                  <div>
                    <Calendar
                      value={selectedDayRange}
                      colorPrimaryLight="#60A5FA"
                      colorPrimary="#1E3A8A"
                      onChange={setSelectedDayRange}
                      disabledDays={diasReservados}
                      minimumDate={utils().getToday()}
                      onDisabledDayError={handleDisabledSelect}
                      shouldHighlightWeekends

                    />
                  </div>
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
        <div class=" bg-blue-900">
          <div class="py-3">
            {reseñas !== undefined ? (
              reseñas.map((reseña, index) => {
                return (
                  <Reseña key={index} resena={reseña} nombre={nombre} getReseñas={getReseñas} />
                )
              })) : (<></>)
            }

            <CrearReseña nombre={nombre} getReseñas={getReseñas} />
          </div>
        </div>
      </body>
    </div>
  )
}