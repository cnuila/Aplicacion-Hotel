import React, { useState, useMemo, useEffect } from 'react'
import { db } from '../../firebase'
import swal from 'sweetalert'
import { storage } from '../../firebase';
import { useDropzone } from 'react-dropzone';
import Items from '../AgregarItems/Items'
import Form from '../AgregarItems/Form'
import { TiMediaPlayOutline } from 'react-icons/ti';
import Loading from './Loading'
import DropdownDetalles from './DropdownDetalles'

function AgregarHabitaciones(props) {

    const [Nombre, setNombre] = useState("");
    const [Precio, setPrecio] = useState("");
    const [files, setFiles] = useState([]);
    const [Url, setUrl] = useState([]);
    const [num, setNum] = useState(0);
    const [todos, setTodos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [detallesDrop, setDetallesDrop] = useState(() => {
        return []
    })
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(prevOpen => !prevOpen)
    }

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

    const alertaSuccess = () => {
        swal({
            text: "La Habitacion " + Nombre + " fue agregado exitosamente",
            icon: "success",
            button: "Aceptar"
        });
    }

    const alertaFail = () => {
        swal({
            text: "La Habitacion " + Nombre + " no se pudo agregar",
            icon: "error",
            button: "Aceptar"
        });
    }

    const alertaFotos = () => {
        swal({
            text: "La Habitacion" + Nombre + " no tiene imagenes",
            icon: "error",
            button: "Aceptar"
        });
    }

    const handleUpload = async (event) => {
        event.preventDefault()
        let dirFotos = [];
        let uploadTask = null;
        if (files.length !== 0) {
            setShowModal(prev => !prev);
            for (var i = 0; i < files.length; i++) {
                const nombreFoto = files[i].name;
                uploadTask = await storage.ref(`habitaciones/${nombreFoto}`).put(files[i]);

                let Links = await storage
                    .ref("habitaciones")
                    .child(nombreFoto)
                    .getDownloadURL()
                    .then(url => {
                        dirFotos.push(url)
                    });
            }

            db.collection("Habitaciones").doc(Nombre).set({
                Nombre: Nombre,
                Precio: Precio,
                Complementos: todos,
                Url: dirFotos
            }).then(() => {
                setShowModal(prev => !prev);
                alertaSuccess()
                setNum(prevNum => prevNum - 1)
                props.mostrarInicial()
            }).catch(() => {
                setShowModal(prev => !prev);
                alertaFail()
            })
        } else {
            alertaFotos()
        }
    };
    //<progress value={progress} max="100" />

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

    useEffect(() => {
        if (num === 0) {
            const listaHabitaciones = props.habitaciones
            listaHabitaciones.map((h) => {
                const Complementos = h.Complementos
                Complementos.map((deta) => {
                    const { text } = deta
                    setDetallesDrop(prevDeta => [...prevDeta, text])
                })
            })
            setNum(prevNum => prevNum + 1)
        }
    });


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
        <>
            {
                showModal ? <Loading showModal={showModal} setShowModal={setShowModal} />
                    : <div>
                        <div className="grid min-h-screen place-items-center">
                            <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-full">
                                <h1 className="text-xl font-semibold text-center">Ingrese información sobre la habitacion</h1>
                                <form onSubmit={handleUpload} className="mt-6">
                                    <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Nombre de la habitacion</label>
                                    <input onChange={event => setNombre(event.target.value)} type="text" name="nombre" placeholder="Premium" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                                    <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Precio</label>
                                    <input onChange={event => setPrecio(event.target.value)} type="number" name="precio" placeholder="800" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                                    <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Detalles</label>
                                    <div className="py-1" />

                                    <div class="relative group inline-block">
                                        <div onClick={handleOpen} class="inline-flex justify-center w-full rounded-md shadow-sm px-40 py-2 bg-blue-900 text-sm font-medium text-white my-2">
                                            Detalles Pasado
                                            <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                            </svg>
                                        </div>

                                        <div class={open ? ("px-40 py-1 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5") : "hidden"}>
                                            {
                                                detallesDrop.map((text) => {
                                                    return (
                                                        <a class="block px-12 flex text-sm text-black border-b-2 border-transparent hover:border-blue-800">{text}</a>
                                                    )
                                                })
                                            }
                                        </div>

                                    </div>

                                    <Form onSubmit={addTodo} />
                                    <Items
                                        todos={todos}
                                        completeTodo={completeTodo}
                                        removeTodo={removeTodo}
                                        updateTodo={updateTodo}
                                    />

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
                                    <button type="submit" class="w-full py-3 mt-10 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">Agregar Habitacion</button>
                                </form>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default AgregarHabitaciones