import React, { useState, useEffect } from 'react'
import { db } from '../../firebase';
import Items from '../AgregarItems/Items'
import Form from '../AgregarItems/Form'
import swal from 'sweetalert'

function ModificarHabitacion(props) {

    const [todos, setTodos] = useState([]);
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [url, setUrl] = useState([]);

    const handleUpload = (event) =>{
        event.preventDefault()
        db.collection("Habitaciones").doc(props.nombre).set({
            Nombre: nombre,
            Precio: precio,
            Complementos: todos,
            Url: url
        }).then(() => {
            alertaSuccess()
            props.mostrarInicial()
        });
    }

    useEffect(() => {
        setNombre(props.nombre)
        db.collection("Habitaciones").where("Nombre", "==", props.nombre)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setNombre(doc.data().Nombre)
                    setTodos(doc.data().Complementos)
                    setPrecio(doc.data().Precio)
                    setUrl(doc.data().Url)
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }, [])


    const alertaSuccess = () => {
        swal({
            text: "La Habitacion se modifico exitosamente",
            icon: "success",
            button: "Aceptar"
        });
    }

    //<progress value={progress} max="100" />

    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
    };

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    };

    const removeTodo = id => {
        const removedArr = [...todos].filter(todo => todo.id !== id);

        setTodos(removedArr);
    };

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    return (
        <div className="grid min-h-screen place-items-center">
            <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-11/12">
                <h1 className="text-xl font-semibold text-center">Modifique la información sobre la habitación</h1>
                <form onSubmit={handleUpload} className="mt-6">
                    <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Nombre de la habitación</label>
                    <input value={nombre} onChange={event => setNombre(event.target.value)} type="text" name="nombre" placeholder="Premium" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" disabled required />
                    <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Precio</label>
                    <input value={precio} onChange={event => setPrecio(event.target.value)} type="number" name="precio" placeholder="800" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                    <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Agregar Complementos</label>

                    <Form onSubmit={addTodo} />
                    <Items
                        todos={todos}
                        completeTodo={completeTodo}
                        removeTodo={removeTodo}
                        updateTodo={updateTodo}
                    />

                    <button type="submit" class="w-full py-3 mt-10 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">Modificar Habitacion</button>
                </form>
            </div>
        </div>
    )
}

export default ModificarHabitacion
