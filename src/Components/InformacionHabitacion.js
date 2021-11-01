import React, { useState, useEffect } from 'react'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, utils } from "react-modern-calendar-datepicker";
import { Carousel } from 'react-responsive-carousel';
import { db, auth } from "../firebase"
import swal from 'sweetalert'
import moment from 'moment'
import CrearReseña from './CrearReseña';
import Navbar from './Navbar';
import Reseña from './Reseña';
import emailjs from 'emailjs-com';

export default function InfoHabitacion({ location, history }) {

  const nombre = location.state.props.nombre
  const complementos = location.state.props.complementos
  const precio = location.state.props.precio
  const id = location.state.props.id
  const fotos = location.state.fotos
  const cantidadHabitaciones = parseInt(location.state.props.cantidad)
  const [reseñas, setReseña] = useState([])
  const [cantidad, setCantidad] = useState(1)
  const [diasReservados, setDiasReservados] = useState([])
  const [fechasCant, setFechasCant] = useState([])
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null
  });
  const [administrador, setAdministrador] = useState(false)
  const [nombreCliente, setNombreCliente] = useState("")
  const [mailCliente, setMailCliente] = useState("")
  const [nameCliente, setNameCliente] = useState("")

  useEffect(() => {
    getReservas()
    getReseñas()
    infoUsuario()

    if (auth.currentUser) {
      var docRef = db.collection("Admin").doc(auth.currentUser.email);
      docRef.get().then((doc) => {
        if (doc.exists) {
          setAdministrador(true)
        }
      }).catch(() => {
      });
    }

  }, [])

  //trae info del usuario actual
  const infoUsuario = async () => {
    const email = auth.currentUser.email;
    const query = await db.collection("Usuarios").where("Email", "==", email).get();
    query.forEach(doc => {
      setNameCliente(doc.data().Nombre)
    })
  }

  //función que recupera todas las reseñas de la habitación actual
  const getReseñas = () => {
    db.collection("Habitaciones").doc(id).collection("Reseñas").orderBy("rating", "desc").get().then(querySnapshot => {
      const listaReseñas = []
      querySnapshot.forEach((doc) => {
        listaReseñas.push({ ...doc.data(), id: doc.id })
      })
      setReseña(listaReseñas)
    })
  }

  //función asíncrona que lee todas las reservas y deshabilita los días según su la cantidad de habitaciones disponibles
  const getReservas = async () => {
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
    setFechasCant(nuevasFechas)
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

  //función que muestra un mensaje al momento de tratar de elegir un día deshabilitado
  const handleDisabledSelect = () => {
    swal({
      text: "Intentaste elegir un día ya reservado",
      icon: "warning",
      button: "Aceptar"
    });
  };

  //funcion que valida que en cada fecha seleccionada haya disponible la cantidad de habitaciones seleccionada
  //retorna true si es valido, si no false
  const validacionCantidad = (from, to) => {
    if (fechasCant.length !== 0) {
      //se llena un arreglo con las fechas a reservar
      let fechasAReservar = []
      let fechaFinal = new Date(to.year, to.month - 1, to.day)
      let fechaInicial = new Date(from.year, from.month - 1, from.day)
      let moment1 = moment(fechaInicial)
      let moment2 = moment(fechaFinal)
      let diferenciaDias = moment2.diff(moment1, 'days') + 1
      for (let i = 0; i < diferenciaDias; i++) {
        fechasAReservar.push({
          year: parseInt(moment1.format('YYYY')),
          month: parseInt(moment1.format('MM')),
          day: parseInt(moment1.format('D')),
        })
        //incrementar un dia
        moment1.add(1, 'days')
      }
      //por cada fecha a reservar se compara con las fechas Cant que se saca en getReservas que ya tiene
      //la cantidad de habitaciones y se compara si la cantidad solicitida es aceptada
      //si no guarda en un arreglo de fecha no disponible
      const diasNoDisponibles = []
      fechasAReservar.forEach((fecha) => {
        fechasCant.forEach((fecha2) => {
          if (fecha.day === fecha2.day && fecha.month === fecha2.month && fecha.year === fecha2.year) {
            let habitacionesDisponibles = cantidadHabitaciones - fecha2.cant;
            if (cantidad > habitacionesDisponibles) {
              diasNoDisponibles.push(fecha2)
            }
          }
        })
      })
      //si el arreglo tiene un elemento no se puede reservar
      if (diasNoDisponibles.length !== 0) {
        let texto = "Los días "
        if (diasNoDisponibles.length === 1) {
          texto = "El día "
        }
        diasNoDisponibles.forEach(fecha => {
          texto += fecha.day + ", "
        })
        //substring para quitar la coma y espacio que se agregan al agregar el ultimo
        texto = texto.substring(0, texto.length - 2)
        texto += " no tienen disponible la cantidad de habitaciones que deseas."
        swal({
          text: texto,
          icon: "warning",
          button: "Aceptar"
        })
        return false
      } else {
        return true
      }
    } else {
      return true
    }
  }

  //función asíncrona que reserva una habitación y redirige a página de mis reservas
  const reservar = async () => {
    const user = auth.currentUser;
    if (cantidad <= 0 || cantidad > cantidadHabitaciones) {
      swal({
        text: "No puedes agregar una cantidad negativa o mayor el número de habitaciones",
        icon: "warning",
        button: "Aceptar"
      });
    } else {
      if (administrador) {
        if (nombreCliente !== "" && mailCliente !== "") {
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
                  if (validacionCantidad(from, to)) {
                    let emailCliente = user.email
                    let fechaFinal = new Date(to.year, to.month - 1, to.day)
                    let fechaInicial = new Date(from.year, from.month - 1, from.day)
                    let moment1 = moment(fechaInicial)
                    let moment2 = moment(fechaFinal)
                    let diferenciaDias = moment2.diff(moment1, 'days') + 1
                    let precioPagar = precio * (diferenciaDias - 1)
                    let fechaInicialFormat = moment1.format('DD/MM/YYYY')
                    let fechaFinalFormat = moment2.format('DD/MM/YYYY')
                    for (let i = 0; i < cantidad; i++) {
                      if (i === 0) {
                        db.collection("Reservas").add({
                          administrador: administrador,
                          nombreCliente: nombreCliente,
                          idHabitacion: id,
                          idCliente,
                          emailCliente,
                          fechaFinal,
                          fechaInicial,
                          precioPagar,
                          pagada: false,
                        }).then(() => {

                          swal({
                            text: "Reservaste con éxito, revisa tu correo!",
                            icon: "success",
                            button: "Aceptar"
                          }).then(() => {
                            history.push("/misReservas");
                          });

                          var templateParams = {
                            name: nombreCliente,
                            subject: 'Reservación Hotel Posada del Angel',
                            email: mailCliente,
                            dia: fechaInicialFormat,
                            final: fechaFinalFormat
                          };

                          emailjs.send('service_qvj4hnv', 'template_si8lrwe', templateParams, 'user_IlfmLUQnITF5aqsX4gKMh')
                            .then(function (response) {
                              console.log('SUCCESS!', response.status, response.text);
                            }, function (error) {
                              console.log('FAILED...', error);
                            });
                        })
                      } else {
                        db.collection("Reservas").add({
                          administrador: administrador,
                          nombreCliente: nombreCliente,
                          idHabitacion: id,
                          idCliente,
                          emailCliente,
                          fechaFinal,
                          fechaInicial,
                          precioPagar,
                          pagada: false,
                        })
                      }
                    }
                  }
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
        } else {
          swal({
            text: "Indica el nombre y correo del cliente",
            icon: "warning",
            button: "Aceptar"
          });
        }
      } else {
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
                if (validacionCantidad(from, to)) {
                  let emailCliente = user.email
                  let fechaFinal = new Date(to.year, to.month - 1, to.day)
                  let fechaInicial = new Date(from.year, from.month - 1, from.day)
                  let moment1 = moment(fechaInicial)
                  let moment2 = moment(fechaFinal)
                  let diferenciaDias = moment2.diff(moment1, 'days') + 1
                  let precioPagar = precio * (diferenciaDias - 1)
                  let fechaInicialFormat = moment1.format('DD/MM/YYYY')
                  let fechaFinalFormat = moment2.format('DD/MM/YYYY')
                  for (let i = 0; i < cantidad; i++) {
                    if (i === 0) {
                      db.collection("Reservas").add({
                        administrador: administrador,
                        nombreCliente: nombreCliente,
                        idHabitacion: id,
                        idCliente,
                        emailCliente,
                        fechaFinal,
                        fechaInicial,
                        precioPagar,
                        pagada: false,
                      }).then(() => {

                        swal({
                          text: "Reservaste con éxito, revisa tu correo!",
                          icon: "success",
                          button: "Aceptar"
                        }).then(() => {
                          history.push("/misReservas");
                        });

                        var templateParams = {
                          name: nameCliente,
                          subject: 'Reservación Hotel Posada del Angel',
                          email: user.email,
                          dia: fechaInicialFormat,
                          final: fechaFinalFormat
                        };

                        emailjs.send('service_kq0urtv', 'template_si8lrwe', templateParams, 'user_IlfmLUQnITF5aqsX4gKMh')
                          .then(function (response) {
                            console.log('SUCCESS!', response.status, response.text);
                          }, function (error) {
                            console.log('FAILED...', error);
                          });
                      })
                    } else {
                      db.collection("Reservas").add({
                        administrador: administrador,
                        nombreCliente: nombreCliente,
                        idHabitacion: id,
                        idCliente,
                        emailCliente,
                        fechaFinal,
                        fechaInicial,
                        precioPagar,
                        pagada: false,
                      })
                    }
                  }
                }
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
    }
  }

  //función que cambia el valor del input de cantidad
  const handleOnChange = ({ target }) => {
    const { value } = target
    setCantidad(value);
  }

  //maneja solo letras
  const KeyPress = (event) => {
    event.target.value = event.target.value.replace(/[^a-zA-z ]/ig, '')
    setNombreCliente(event.target.value)
  }

  return (
    <div>
      <Navbar />
      <body class="antialiased">
        <div class="py-6 bg-gray-200">
          <div class="mx-1 px-4 sm:px-6 lg:px-8 mt-6">
            <div class="flex flex-col md:flex-row -mx-4">
              <div class="md:flex-1 px-4 md:w-2/5 h-auto">
                <div class="rounded-lg bg-gray-100 mb-4 w-full h-80 object-cover">
                  <Carousel className="w-full h-64" autoPlay infiniteLoop swipeable showThumbs={false} dynamicHeight={true} showStatus={false}>
                    {fotos.map((url, index) => {
                      return (
                        <div className="w-full h-80" key={index}>
                          <img className="object-cover h-full w-full" src={url} alt="foto" />
                        </div>
                      )
                    })}
                  </Carousel>
                </div>
                <div className="px-4 w-1/2">
                  <h2 className="text-gray-500 font-bold">Incluye:</h2>
                  {complementos.map((c, index) => {
                    return (
                      <div>
                        <p class="text-gray-500 pl-3">
                          <li key={index}>{c.text}</li>
                        </p>
                      </div>
                    )
                  })}

                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:w-3/5">
                <div>
                  <h2 className="mb-2 leading-tight tracking-tight font-bold text-blue-900 text-2xl md:text-3xl">{nombre}</h2>
                  <div className="flex flex-col items-center my-4">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="rounded-lg bg-gray-100 flex py-2 px-3 mx-1">
                        <span className="text-blue-700 mr-1 mt-1">Lps.</span>
                        <span className="font-bold text-blue-900 text-3xl">{precio}.00</span>
                      </div>
                      <div className="mx-5 flex flex-row">
                        <h2 className="text-blue-900 self-center font-bold text-lg">Cantidad:</h2>
                        <input type="number" name="cantidad" className="ml-2 pl-3 w-1/2 rounded-lg text-center text-lg focus:outline-none" min={1} value={cantidad} max={cantidadHabitaciones} required onChange={handleOnChange} />
                      </div>
                    </div>
                  </div>
                  {
                    administrador
                      ?
                      <div>
                        <label className="block mt-2 text-xs font-semibold text-blue-900 uppercase">Nombre del Cliente</label>
                        <input onChange={KeyPress} type="text" name="nombre" placeholder="Nombre Completo" className="block w-80 p-3 mt-2 text-black rounded-lg bg-white appearance-none focus:outline-none focus:shadow-inner" required />
                        <label className="block mt-2 text-xs font-semibold text-blue-900 uppercase">Correo del Cliente</label>
                        <input onChange={event => setMailCliente(event.target.value)} type="email" name="nombre" placeholder="ejemplo@gmail.com" className="block w-80 p-3 mt-2 text-black rounded-lg bg-white appearance-none focus:outline-none focus:shadow-inner" required />
                      </div>
                      :
                      <></>
                  }
                  <div className="my-4 grid place-items-center">
                    <button type="button" class="h-14 px-6 py-25 font-semibold rounded-xl bg-blue-900 hover:bg-blue-800 text-white outline-none focus:outline-none" onClick={() => reservar()}>
                      Confirmar Reserva
                    </button>
                  </div>
                </div>
                <div className="grid place-items-center">
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
          <div className=" mt-2 flex justify-center container w-full">
          </div>
        </div>
        <div className=" bg-blue-900">
          <div className="py-3">
            {reseñas !== undefined ? (
              reseñas.map((reseña, index) => {
                if (reseña.visualizar) {

                  return (
                    <Reseña key={index} resena={reseña} id={id} nombre={nombre} getReseñas={getReseñas} />

                  )
                }
                return <></>
              })) : (<></>)
            }{/*manda props a crear resena*/}
            <CrearReseña nombre={nombre} id={id} getReseñas={getReseñas} />
          </div>
        </div>
      </body>
    </div>
  )
}