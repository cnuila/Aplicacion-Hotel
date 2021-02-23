import { Link } from 'react-router-dom';
import ReactStarRating from "react-star-ratings-component";
import React, { Component } from 'react'
import swal from 'sweetalert'
import { db, auth } from '../firebase'

class CrearReseña extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ...this.estadoInicial,
        }
    }
    estadoInicial = {
        rating: 0,
        comentario: '',
    }

    handlecomentario = (event) => {
        this.setState({
            comentario: event.target.value
        })
    }

    onStarClick = (valor) => {
        this.setState({
            rating: valor,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const user = auth.currentUser;
        if (user) {
            if (this.state.comentario.includes('puta') || this.state.comentario.includes('maldito') || this.state.comentario.includes('puta') || this.state.comentario.includes('cabron') || this.state.comentario.includes('pija') || this.state.comentario.includes('mierda')

            ) {
                swal({
                    text: "Su Comentario incluye palabras ofensivas",
                    icon: "warning",
                    button: "Aceptar"
                });
            } else if (this.state.rating === 0) {
                swal({
                    text: "Por favor indicar cuantas estrellas",
                    icon: "warning",
                    button: "Aceptar"
                });
            } else if (this.state.comentario.length < 5) {
                swal({
                    text: "Su comentario es muy corto",
                    icon: "warning",
                    button: "Aceptar"
                });
            } else {
                const resAn = db.collection("Habitaciones").doc(this.props.nombre).collection("Reseñas")
                const email = user.email;
                resAn.add({
                    comentario: this.state.comentario,
                    rating: this.state.rating,
                    visualizar: true,
                    usuario: email,
                }).then(() => {
                    swal({
                        text: "La reseña fue enviada exitosamente",
                        icon: "success",
                        button: "Aceptar"
                    })
                    this.props.getReseñas()
                    this.setState({
                        rating:0,
                        comentario:"",
                    })        
                }).catch((error) => {
                    swal({
                        text: error,
                        icon: "warning",
                        button: "Aceptar"
                    });
                })
            }
        } else {
            swal({
                text: "Debes iniciar sesión para hacer una reseña",
                icon: "warning",
                button: "Aceptar"
            });
        }
    }

    render() {
        return (
            <div >
                <div class="flex justify-center">
                    <div class="flex justify-center shadow-lg  mx-8 mb-1 ">
                        <form class="w-full max-w-xl justify-center  bg-gray-200 rounded-lg px-4 pt-1 border-gray-600 border-1">
                            <div class="flex flex-wrap justify-center -mx-3 mb-10">
                                <h2 class="px-4 -pt-1 pb-2 text-blue text-lg">Tu opinión es importante</h2>
                                <ReactStarRating
                                    numberOfStar={5} numberOfSelectedStar={this.state.rating} colorFilledStar="yellow"
                                    colorEmptyStar="blue" starSize="20px" spaceBetweenStar="8px"
                                    disableOnSelect={false}
                                    onSelectStar={(val) => this.onStarClick(val)}
                                    />
                                <div class="w-full md:w-full px-3 mb-2 mt-2">
                                    <textarea name="comentario" onChange={this.handlecomentario} value={this.state.comentario} class="bg-gray-100 rounded border  border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Danos tu Opinión' required></textarea>
                                </div>
                                <div class="w-full justify-center flex items-start md:w-full px-3">
                                    <input type='submit' onClick={this.handleSubmit} class="bg-gray-300  text-gray-900 font-medium py-1 px-4 border-2 border-gray-700 rounded-lg tracking-wide mr-1 hover:bg-gray-400" value='Sube tu comentario' />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/* inicio de comentarios anteriorires*/}
            </div>



        )
    }
}
export default CrearReseña;