import React, { useState, useMemo, useEffect } from 'react'
import { useDropzone } from 'react-dropzone';
import { db, storage } from '../../firebase';
import Items from '../AgregarItems/Items'
import Form from '../AgregarItems/Form'
import swal from 'sweetalert'
import Loading from './Loading'

function ModificarServicios(props) {

    const [todos, setTodos] = useState([]);
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [url, setUrl] = useState([]);
    const [files, setFiles] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: 'image/jpeg, image/png, image/jpg', maxFiles: 5, onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    })

    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    };

    const activeStyle = {
        borderColor: '#2196f3'
    };

    const acceptStyle = {
        borderColor: '#00e676'
    };

    const rejectStyle = {
        borderColor: '#ff1744'
    };

    const thumbsContainer = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16
    };

    const thumb = {
        display: 'inline-flex',
        borderRadius: 2,
        border: '1px solid #eaeaea',
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: 'border-box'
    };

    const thumbInner = {
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden'
    };

    const img = {
        display: 'block',
        width: 'auto',
        height: '100%'
    };

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    alt=""
                    src={file.preview}
                    style={img}
                />
            </div>
        </div>
    ));

    const handleUpload = async (event) => {
        event.preventDefault()

        let dirFotos = [];
        let uploadTask = null;

        url.map(ur => {
            dirFotos.push(ur)
        })
        setShowModal(prev => !prev);
        if (files.length >= 0) {
            for (var i = 0; i < files.length; i++) {
                const nombreFoto = files[i].name;
                uploadTask = await storage.ref(`servicios/${nombreFoto}`).put(files[i]);

                let Links = await storage
                    .ref("servicios")
                    .child(nombreFoto)
                    .getDownloadURL()
                    .then(url => {
                        dirFotos.push(url)
                    });
            }
        }

        db.collection("Servicios").doc(nombre).set({
            Nombre: nombre,
            Precio: precio,
            Detalles: todos,
            Url: dirFotos,
            Resena: [],
        }).then(() => {
            setShowModal(prev => !prev);
            alertaSuccess()
            props.mostrarInicial()
        }).catch(() => {
            setShowModal(prev => !prev);
        })

    }

    useEffect(() => {
        setNombre(props.nombre)
        db.collection("Servicios").where("Nombre", "==", props.nombre)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setNombre(doc.data().Nombre)
                    setTodos(doc.data().Detalles)
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
            text: "El Servicio se modifico exitosamente",
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

    const handleModificarFotos = (event) => {
        event.preventDefault()
        var element
        var index
        for (index = 0; index < url.length; index++) {
            element = url[index];
            if (element === event.target.id) {
                break
            }
        }

        let deleteRef
        deleteRef = storage.refFromURL(element)
        deleteRef.delete()

        const temp = [...url];
        temp.splice(index, 1);
        setUrl(temp);
    }

    return (
        <>
            {
                showModal ? <Loading showModal={showModal} setShowModal={setShowModal} />
                    : <div>
                        <div className="grid min-h-screen place-items-center">
                            <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-11/12">
                                <h1 className="text-xl font-semibold text-center">Modifique la información sobre el servicio</h1>
                                <form onSubmit={handleUpload} className="mt-6">
                                    <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Nombre del servicio</label>
                                    <input value={nombre} onChange={event => setNombre(event.target.value)} type="text" name="nombre" placeholder="Premium" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" disabled required />
                                    <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Precio</label>
                                    <input value={precio} onChange={event => setPrecio(event.target.value)} type="number" name="precio" placeholder="800" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                                    <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Detalles</label>

                                    <Form onSubmit={addTodo} />
                                    <Items
                                        todos={todos}
                                        completeTodo={completeTodo}
                                        removeTodo={removeTodo}
                                        updateTodo={updateTodo}
                                    />

                                    <div className="bg-gray-300 my-4 py-4 px-6 rounded-md">
                                        <h2 className="text-blue-500 font-semibold cursor-default mb-2">Fotos</h2>
                                        <div className="grid grid-cols-2 place-items-center">
                                            {
                                                url.map(foto => {
                                                    return (
                                                        <div>
                                                            <div class="relative bg-gray-300 rounded-2xl m-auto py-2 px-2">
                                                                <button className="absolute top-0 right-0" onClick={handleModificarFotos}>
                                                                    <svg class="fill-current text-red-500 h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path id={foto} fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                                                    </svg>
                                                                </button>
                                                                <img
                                                                    className="h-40 w-40 object-cover rounded-xl"
                                                                    alt="Habitacion"
                                                                    src={foto}
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>

                                    <div class="py-6">
                                        <section className="container">
                                            <div {...getRootProps({ className: 'dropzone', style })}>
                                                <input {...getInputProps()} />
                                                <p>Drag 'n' drop some files here, or click to select files</p>
                                            </div>
                                            <aside style={thumbsContainer}>
                                                {thumbs}
                                            </aside>
                                        </section>
                                    </div>

                                    <button type="submit" class="w-full py-3 mt-10 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">Modificar Servicio</button>
                                </form>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default ModificarServicios
