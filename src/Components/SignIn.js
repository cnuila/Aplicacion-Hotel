import React from 'react'
import {db} from "../firebase"
import imagen from "./ImagenFondo2.jpg"

class SingIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.estadoInicial,

        }
    }
    estadoInicial = {
        Nombre: '',
        Apellido: '',
        Identidad: '',
        email: '',
        password: '',
        password2: ''
    }

    handleInputChange( target ) {
        let { name, type } = target
        let valor
        valor = target.value
      //  this.estadoInicial({
        //    [name]: valor,
         // })
          console.log(name+" "+valor)
    }
    

    handleNombre = (event) =>{
        console.log(event.target.value)
        this.setState({
            Nombre:event.target.value
        })
        
        
    }
    handleApellido = (event) =>{
        console.log(event.target.value)
        this.setState({
            Apellido:event.target.value
        })
        
        
    }
    handlecontra = (event) =>{
        console.log(event.target.value)
        this.setState({
            password:event.target.value
        })
    }
    handleconfirma = (event) =>{
        console.log(event.target.value)
        this.setState({
            password2:event.target.value
        })
    }
    handleId = (event) =>{
        console.log(event.target.value)
        this.setState({
            Identidad:event.target.value
        })
    }
    handleemail = (event) =>{
        console.log(event.target.value)
        this.setState({
            email:event.target.value
        })
    }
    /*function validar_clave(contrasenna)
		{
			if(contrasenna.length >= 8)
			{		
				var mayuscula = false;
				var minuscula = false;
				var numero = false;
				var caracter_raro = false;
				
				for(var i = 0;i<contrasenna.length;i++)
				{
					if(contrasenna.charCodeAt(i) >= 65 && contrasenna.charCodeAt(i) <= 90)
					{
						mayuscula = true;
					}
					else if(contrasenna.charCodeAt(i) >= 97 && contrasenna.charCodeAt(i) <= 122)
					{
						minuscula = true;
					}
					else if(contrasenna.charCodeAt(i) >= 48 && contrasenna.charCodeAt(i) <= 57)
					{
						numero = true;
					}
					else
					{
						caracter_raro = true;
					}
				}
				if(mayuscula == true && minuscula == true && caracter_raro == true && numero == true)
				{
					return true;
				}
			}
			return false;
		}*/ 



//espacios en blanco
/*var espacios = false;
var cont = 0;

while (!espacios && (cont < p1.length)) {
  if (p1.charAt(cont) == " ")
    espacios = true;
  cont++;
}
   
if (espacios) {
  alert ("La contraseña no puede contener espacios en blanco");
  return false;
} 
 */
    validaespacio(p1,p2){
        if (p1.length == 0 || p2.length == 0) {
            alert("Los campos de la password no pueden quedar vacios");
            return false;
          }
    }
    contrasigaules(p1,p2){
        if (p1 != p2) {
            alert("Las passwords deben de coincidir");
            return false;
        } else {
            alert("Todo esta correcto");
            return true; 
        }
    }

    

     handleSubmit = (event) =>{
        event.preventDefault()
        db.collection("Usuarios").doc(this.state.Identidad).set({
            Identidad:this.state.Identidad,
            Nombre:this.state.Nombre,
            Apellido:this.state.Apellido,
            Contrasena:this.state.password,
            Email:this.state.email
        }).then(()=>{
            console.log("Agregado a la base de datos ")
        });
     }

    
    render() {
        return (
            //<body background="https://scontent.ftgu1-1.fna.fbcdn.net/v/t1.0-9/104181902_10157399492806724_8294953661876225000_o.jpg?_nc_cat=106&ccb=2&_nc_sid=730e14&_nc_eui2=AeEEou_0423Aiq6dtRu13DttUSYYPRRfMA9RJhg9FF8wD08Drbpu5wZgHygu_4qYIHViFY6HimWDUa4lDDOZFYy3&_nc_ohc=fScc_TOxxQ8AX8OiH1a&_nc_ht=scontent.ftgu1-1.fna&oh=2473f66cfae5fc9eeb4380a8ba59983c&oe=5FEA1EC9" >
             
            <body background={imagen} >
               
                <form onSubmit={this.handleSubmit}>
                    <div className="grid min-h-screen place-items-center" >
                        <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
                            <div className="mt-6">
                                <div className="flex justify-between gap-3">
                                    <span className="w-1/2">
                                        <label for="Nombre" className="block text-xs font-semibold text-gray-600 uppercase">Nombre</label>
                                        <input id="Nombre" type="text" onChange={this.handleNombre} name="Nombre" placeholder="Juan" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required/>
                                    </span>
                                    <span className="w-1/2">
                                        <label for="Apellido" className="block text-xs font-semibold text-gray-600 uppercase">Apellido</label>
                                        <input id="Apellido" type="text" onChange={this.handleApellido} name="Apellido" placeholder="Perez"  className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                                    </span>

                                </div>

                                <label for="Identidad" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Identidad</label>
                                <input id="Identidad" type="text" onChange={this.handleId} name="Identidad" placeholder="0000-0000-0000" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />

                                <label for="email" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">E-mail</label>
                                <input id="email" type="email" name="email" onChange={this.handleemail} placeholder="john.doe@company.com"  className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                                <label for="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Contraseña</label>
                                <input id="password" type="password" name="password" onChange={this.handlecontra} placeholder="********" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                                <label for="password2" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Confirma Contraseña</label>
                                <input id="password2" type="password" onChange={this.handleconfirma} name="password2" placeholder="********"  className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                                <input value="Registrate" type="submit" className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"/>
                                <p className="flex justify-between inline-block mt-4 text-xs text-gray-500 cursor-pointer hover:text-black"> ¿Ya estás registrado?</p>
                            </div>
                        </div>
                    </div>
                </form>
            </body>

        );
    }
}
export default SingIn;