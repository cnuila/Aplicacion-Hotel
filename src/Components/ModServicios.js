import React from 'react'
import { Component } from 'react'
import { db } from '../firebase'
import swal from 'sweetalert'

class ModServicios extends Component{


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

    handleDatos=()=>{
        const doc= db.collection("Servicios").doc(this.props.Id);
        doc.get().then((doc)=>{
            this.setState({
                Nombre:doc.data().Nombre,
                Precio:doc.data().Precio,
                Detalles:doc.data().Detalles
            })
        })
    }

    handleModServicios = (event) =>{
       event.preventDefault();
       db.collection("Servicios").doc(this.state.Nombre).set({
           Nombre:this.state.Nombre,
           Precio:this.state.Precio,
           Detalles:this.state.Detalles
       }).then(()=>
        this.alerta(), ()=>{
           console.log("No se modifico el servicio")
       });
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
        this.handleDatos();
        return(
                <div className="grid min-h-screen place-items-center">
                    <div className="w-3/4 p-12 bg-white">
                        <h1 className="text-xl font-semibold text-center">Ingrese información sobre el servicio</h1>
                        <form className="mt-6">                       
                            <label className="block mt-2 text-sm font-semibold text-gray-600 uppercase">Nombre del servicio</label>
                            <input type="text" onChange={this.handleNombre} name="nombre" value={this.state.Nombre} className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                            <label className="block mt-2 text-sm font-semibold text-gray-600 uppercase">Precio del servicio</label>
                            <input type="number" onChange={this.handlePrecio} name="Precio" value={this.state.Precio} className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                            <label className="block mt-8 text-sm font-semibold text-gray-600 uppercase">Detalles</label>
                            <input type="text" value={this.state.elemento} onChange={this.handleDetalles} name="Detalles" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"/>
                            <div className="w-full">
                              <button onClick={this.handleStateDetalles} className="text-white font-bold p-4 rounded bg-blue-900 hover:bg-indigo-700 px-3 py-2 mt-4">Agregar detalle</button>
                            </div>
                            
                            <input type="submit" value="Agregar Servicio" onClick={this.handleModServicios} className="w-full py-3 mt-10 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none" />
                                
                        </form>
                    </div>
                </div>
        )
    }




    
}

export default ModServicios