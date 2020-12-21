import React from 'react'
import { Component } from 'react'
import { db } from '../firebase'
import swal from 'sweetalert'

class AgregarServicios extends Component{


    constructor(){
        super()
        this.state={
            Nombre:"",
            Precio:"",
            Detalles:[],
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

    handleDetalles = (event) =>{
        this.setState({
            elemento:event.target.value
        })
    }

    handleStateDetalles = (event) =>{
        event.preventDefault();

        let elemento=this.state.Detalles

        let valor=this.state.elemento

        elemento.push(valor)

        this.setState({
            Detalles:elemento,
            elemento:""
        })
    }
    
    alerta=()=>{
        swal({
            text: "El servicio "+ this.state.Nombre + " fue agregado exitosamente",
            icon: "success",
            button: "Aceptar"
        });
    }

    handleAgregarServicios = (event) =>{
       event.preventDefault();
       db.collection("Servicios").doc(this.state.Nombre).set({
           Nombre:this.state.Nombre,
           Precio:this.state.Precio,
           Detalles:this.state.Detalles
       }).then(()=>
        this.alerta(), ()=>{
           console.log("No agrego a servicios")
       });
        var n1 = (document.getElementById("nombre").value);
        var n2 = parseInt(document.getElementById("precio").value);
        n1.value = "";
        n2.value = 0;
    }
    
    handleDelete = (value)=>{
        let elemento=this.state.Detalles
        let indice=elemento.indexOf(value)

        let valor = elemento.splice(indice, 1)
        this.setState({
            Detalles:this.state.Detalles
        })

    }


    render(){
        return(
                <div className="grid min-h-screen place-items-center">
                    <div className="w-3/4 p-12 bg-white">
                        <h1 className="text-xl font-semibold text-center">Ingrese información sobre el servicio</h1>
                        <form  onSubmit={this.handleAgregarServicios} className="mt-6">                       
                            <label className="block mt-2 text-sm font-semibold text-gray-600 uppercase">Nombre del servicio</label>
                            <input type="text" id="nombre" onChange={this.handleNombre} name="nombre" placeholder="Salón de eventos" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                            <label className="block mt-2 text-sm font-semibold text-gray-600 uppercase">Precio del servicio</label>
                            <input type="number" id="precio" onChange={this.handlePrecio} name="Precio" placeholder="Lps.1500" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                            <label className="block mt-8 text-sm font-semibold text-gray-600 uppercase">Detalles</label>
                            <input type="text" id="detalles" value={this.state.elemento} onChange={this.handleDetalles} name="Detalles" placeholder="Incluye decoraciones" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"/>
                            <div className="w-full">
                              <button onClick={this.handleStateDetalles} className="text-white font-bold p-4 rounded bg-blue-900 hover:bg-indigo-700 px-3 py-2 mt-4">Agregar detalle</button>
                            </div>
                            {this.state.Detalles.map(elemento =>(   
                                <div key={elemento}>
                                     <input defaultValue={elemento} type="text" className="inline-block w-10/12 p-3 mt-4 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required/>
                                     <span onClick={()=>this.handleDelete(elemento)} className="cursor-pointer w-2/12 p-3 inline-block bg-red-500 text-center">X</span>
                                </div>
                            ))}
                            <button type="submit" className="w-full py-3 mt-10 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none" >
                                Agregar Servicio
                            </button>   
                                
                        </form>
                    </div>
                </div>
        )
    }




    
}

export default AgregarServicios