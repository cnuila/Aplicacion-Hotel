    
import { Link } from 'react-router-dom';
import ReactStarRating from "react-star-ratings-component";
import React, { Component } from 'react'

class reseña extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.estadoInicial,
        }
    }
    estadoInicial = {
        Rating: '',
        comentario: '',

    }
    handlecomentario = (event) => {
        console.log(event.target.value)
        this.setState({
            comentario: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        // perform all neccassary validations
        
        if (this.state.comentario.includes('puta')||this.state.comentario.includes('maldito')||this.state.comentario.includes('puta')||this.state.comentario.includes('cabron')||this.state.comentario.includes('pija')||this.state.comentario.includes('mierda')
        
        ){    
            console.log(this.state.Rating)
            alert("Su Comentario incluye palabras ofensivas")
        }else if(this.state.Rating===""){
            console.log(this.state.Rating)
            alert("por favor indicar cuantas estrellas")
        }else if(this.state.comentario.length<5){
            alert("su comentario es muy corto")
        } 
        else {
            console.log(this.state.Rating)
            alert("Su Comentario es valido")
            // poner la base de datos que corresponde con la subcoleccion
            /*db.collection("").doc(this.state.Identidad).set({
                rating: this.state.Rating,
                comentario: this.state.comentario,
                
            }).then(() => { 
            });
            */}
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
                                    numberOfStar={5} numberOfSelectedStar={3} colorFilledStar="yellow"
                                    colorEmptyStar="blue" starSize="20px" spaceBetweenStar="8px"
                                    disableOnSelect={false}
                                    onSelectStar={val => {
                                        this.state.Rating = val
                                    }}/>
                                <div class="w-full md:w-full px-3 mb-2 mt-2">
                                    <textarea name="comentario" onChange={this.handlecomentario} class="bg-gray-100 rounded border  border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Danos tu Opinión' required></textarea>
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
export default reseña;