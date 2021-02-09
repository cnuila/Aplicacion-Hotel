import ReactStarRating from "react-star-ratings-component";
import React, { Component } from 'react'
import { db } from "../firebase"
class Comentario extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.estadoInicial,
        }
    }
    estadoInicial = {
        Rating: '',
        comentario: '',
        Nombre: '',
    };
    /*Consulta = async () => {
        const query = await db.collection("Usuarios").where("Identidad", "==", "0801-1999-19890").get();
        query.forEach(doc => {
            this.setState({
                this.state.Rating: doc.data().Rating,
                this.state.Nombre: doc.data().Nombre,
                this.state.comentario: doc.data().comentario,
            })
        })
    }*/
    render() {
        return (
            <div class="">
                <div class="flex justify-center container w-full mx-auto py-12 px-4">
                    <div class="  flex justify-center w-2/3  bg-indigo-600 rounded-3xl border-blue-900 border shadow-lg pb-6 lg:pb-0">
                        <div class="w-full  p-4">
                            <div class="justify-items-center ">

                                <h3 class="text-white mx-7 font-semibold text-lg text-center md:text-left ">{this.state.nombre}</h3>
                                <p class="work-sans font-semibold text-xl text-white"></p>
                                <div class="mx-5 mb-1">
                                    <ReactStarRating numberOfStar={5} numberOfSelectedStar={this.state.Rating} colorFilledStar="yellow" colorEmptyStar="white" starSize="25px" spaceBetweenStar="8px" disableOnSelect={true} />
                                </div>
                                <textarea name="comentario" value={this.state.comentario} class="bg-white text-xl leading-normal resize-none w-full h-20 py-2 px-3 font-medium text-pink-50 focus:outline-none " name="body"  ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Comentario;