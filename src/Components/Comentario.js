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
                Rating: doc.data().Rating,
                Nombre: doc.data().Nombre,
                comentario: doc.data().comentario,
            })
        })
    }*/
    render() {
        return (
            <div class="">
                <div class="flex justify-center container w-full mx-auto py-12 px-4">
                    <div class="  flex justify-center w-2/3  bg-gray-700 rounded-3xl border shadow-lg pb-6 lg:pb-0">
                        {/*<img alt="avatar" width="48" height="48" class="rounded-full w-10 h-10 mr-4 mx-4 my-2 shadow-lg mb-4" src="https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png" />
                        */ }<div class="w-full  p-4">
                            <div class="justify-items-center ">

                                <h3 class="text-pink-50  mx-7 font-semibold text-lg text-center md:text-left ">Braulio </h3>
                                <p class="work-sans font-semibold text-xl text-white"></p>
                                <div class="mx-5 mb-1">
                                <ReactStarRating numberOfStar={5} numberOfSelectedStar={3} colorFilledStar="yellow" colorEmptyStar="gray" starSize="25px" spaceBetweenStar="8px" disableOnSelect={true} />
                                </div>
                                <textarea  name="comentario" value="Un Dia estos majes me pusieron algo que se salio de pedo, la cosa es que, nunca pensaron el seguridad de la gente que estaba ahi" class="bg-gray-700 text-xl leading-normal resize-none w-full h-20 py-2 px-3 font-medium text-pink-50 focus:outline-none " name="body"  ></textarea>


                            </div>

                            

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default Comentario;