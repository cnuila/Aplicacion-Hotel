import { Container } from "postcss";
import React from "react";
import {db} from "../firebase"

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
            identidad:event.target.value
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

    

     addUser = () => {
         console.log("acabas de entrar a esta opcion")
         db.collection("Usuarios").doc(this.state.Identidad).set({
            Identidad:this.state.Identidad,
            Nombre:this.state.Nombre,
            Apellido:this.state.apellido,
            Contrasena:this.state.password,
            Email:this.state.email
        }).then(()=>{
            console.log("Maje, felicidades porque agregaaste a la base. ")
        });
        console.log("No agrego al parecer :(")
     }
    
    render() {
        return (
            <body background="https://get.wallhere.com/photo/sea-bay-beach-Tourism-hotel-swimming-pool-resort-lagoon-pier-Caribbean-vacation-estate-leisure-ocean-186672.jpg" >
                <form>
                    <div class="grid min-h-screen place-items-center" >
                        <div class="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
                            <div class="mt-6">
                                <div class="flex justify-between gap-3">
                                    <span class="w-1/2">
                                        <label for="Nombre" class="block text-xs font-semibold text-gray-600 uppercase">Nombre</label>
                                        <input id="Nombre" type="text" onChange={this.handleNombre} name="Nombre" placeholder="Juan" class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required/>
                                    </span>
                                    <span class="w-1/2">
                                        <label for="Apellido" class="block text-xs font-semibold text-gray-600 uppercase">Apellido</label>
                                        <input id="Apellido" type="text" onChange={this.handleApellido} name="Apellido" placeholder="Perez"  class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                                    </span>

                                </div>

                                <label for="Identidad" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Identidad</label>
                                <input id="Identidad" type="text" onChange={this.handleId} name="Identidad" placeholder="0000-0000-0000" class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />

                                <label for="email" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">E-mail</label>
                                <input id="email" type="email" name="email" onChange={this.handleemail} placeholder="john.doe@company.com"  class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                                <label for="password" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Contraseña</label>
                                <input id="password" type="password" name="password" onChange={this.handlecontra} placeholder="********" class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                                <label for="password2" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Confirma Contraseña</label>
                                <input id="password2" type="password" onChange={this.handleconfirma} name="password2" placeholder="********"  class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                                <button type="submit" onClick={event=> this.addUser} class="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                                    Registrate
                            </button>
                                <p class="flex justify-between inline-block mt-4 text-xs text-gray-500 cursor-pointer hover:text-black"> ¿Ya estás registrado?</p>
                            </div>
                        </div>
                    </div>
                </form>
            </body>

        );
    }
}
export default SingIn;