import React from 'react'
import { Component } from 'react'
import { db } from '../firebase'

class AgregarHabitaciones extends Component{


    constructor(){
        super()
        this.state={
            Nombre:"",
            Precio:"",
            Agregados:[],
            Fotografias:[],
            elemento:""
        }
        
    }
    
    handleNombre = (event)=>{
        this.setState({
            Nombre:event.target.value
        })
        
    }

    handlePrecio = (event)=>{
        this.setState({
            Precio:event.target.value
        })
        
    }

    handleAgregadados = (event) =>{
        this.setState({
            elemento:event.target.value
        })
    }

    handleStateAgregados = (event) =>{
        event.preventDefault();
        this.state.Agregados.push(this.state.elemento)
        this.setState({
            elemento:""
        })
    }

    handleAgregarHabitacion = (event) =>{
       event.preventDefault();
       db.collection("Habitaciones").doc(this.state.Nombre).set({
           Nombre:this.state.Nombre,
           Precio:this.state.Precio,
           Agregados:this.state.Agregados
       }).then(()=>
       console.log("Agrego a habitaciones"), ()=>{
           console.log("No agrego a habitaciones")
       });
    }


    handleDelete = (indice, elemento)=>{
        console.log("Este es el indice - ",indice)
        console.log("Este es el elemento - ",this.state.Agregados[indice])
        this.state.Agregados.splice(indice, 1)
        console.log("Este este es el estado - ",this.state.Agregados)
    }


    render(){
        return(
                <div className="grid min-h-screen place-items-center">
                    <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
                        <h1 className="text-xl font-semibold text-center">Ingrese información sobre la habitación</h1>
                        <form className="mt-6">                       
                            <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Nombre de la habitación</label>
                            <input onChange={this.handleNombre}type="text" name="nombre" placeholder="Premium" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                            <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Precio de la habitación</label>
                            <input onChange={this.handlePrecio} type="number" name="Precio" placeholder="Lps.1500" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                            <label className="block mt-8 text-xs font-semibold text-gray-600 uppercase">Agregados</label>
                            <input value={this.state.elemento} onChange={this.handleAgregadados} type="text" name="Agregados" placeholder="Desayuno gratís" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"/>
                            <div className="w-full">
                              <button onClick={this.handleStateAgregados} className="bg-green-400 px-3 py-2 mt-4">Agregar complemento</button>
                            </div>
                            {this.state.Agregados.map(elemento =>(   
                                <div key={elemento}>
                                     <input defaultValue={elemento} type="text" className="inline-block w-10/12 p-3 mt-4 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"/>
                                     <span onClick={()=>this.handleDelete(this.state.Agregados.indexOf(elemento), elemento)} className="cursor-pointer w-2/12 p-3 inline-block bg-red-500 text-center">X</span>
                                </div>
                            ))}
                            <button onClick={this.handleAgregarHabitacion} className="w-full py-3 mt-10 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                                Agregar Habitación
                            </button>
                    </form>
                    </div>
                </div>
        )
    }




    
}

export default AgregarHabitaciones