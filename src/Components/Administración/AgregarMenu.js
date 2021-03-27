import React, { useState, useMemo, useEffect } from 'react'
import { db } from '../../firebase'
import swal from 'sweetalert'
import { storage } from '../../firebase';
import { useDropzone } from 'react-dropzone';
import Items from '../AgregarItems/Items'
import Form from '../AgregarItems/Form'
import { TiMediaPlayOutline } from 'react-icons/ti';
import Loading from './Loading'

function AgregarMenu(props) {
    //variables utilizadas
    const [Nombre, setNombre] = useState("");
    const [files, setFiles] = useState([]);
    const [Url, setUrl] = useState([]);
    const [progress, setProgress] = useState(0);
    const [todos, setTodos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [detallesDrop, setDetallesDrop] = useState([])
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [num, setNum] = useState(0);

    //Donde se agregan las fotos se especifica que tipos y cuantos aceptaba el drag n drop
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


    //Estilos del drag n drop
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

    //alertas, se corren cuando se agrea una habitacion correctamente, cuando no se puede agregar o cuando el drag n drop no tiene imagenes
    const alertaSuccess = () => {
        swal({
            text: "El Menu " + Nombre + " fue agregado exitosamente",
            icon: "success",
            button: "Aceptar"
        });
    }

    const alertaFail = () => {
        swal({
            text: "El Menu " + Nombre + " no se pudo agregar",
            icon: "error",
            button: "Aceptar"
        });
    }

    const alertaFotos = () => {
        swal({
            text: "El Menu" + Nombre + " no tiene imagenes",
            icon: "error",
            button: "Aceptar"
        });
    }

    //maneja y sube las fotos al Firebase Storage y Firestore
    const handleUpload = async (event) => {
        event.preventDefault()

        //variables
        let dirFotos = [];
        let uploadTask = null;

        //revisa si no hay fotos en el drag n drop
        if (files.length !== 0) {

            //se muestra un modal de carga, para simular de que hay algo trabajando en el backend
            setShowModal(prev => !prev);

            //recorre todas las fotos del drag n drop y las va subiendo una por una en el Firebase Storage
            for (var i = 0; i < files.length; i++) {
                const nombreFoto = files[i].name;
                uploadTask = await storage.ref(`menu/${nombreFoto}`).put(files[i]);

                //trae los links de descarga
                let Links = await storage
                    .ref("menu")
                    .child(nombreFoto)
                    .getDownloadURL()
                    .then(url => {
                        dirFotos.push(url)
                    });
            }

            //se crea una collection de menus donde se agrega toda la info del menu
            db.collection("Menu").doc(Nombre).set({
                Nombre: Nombre,
                Detalles: todos,
                Url: dirFotos,
                Visible: visible
            }).then(() => {
                //si se agrega bien, se quita el modal, y se regresa a la lista de todas las habitaciones
                setShowModal(prev => !prev);
                alertaSuccess()
                setNum(prevNum => prevNum - 1)
                props.mostrarInicial()
            }).catch(() => {
                //si falla se quita el modal y muesta una alerta de falla
                setShowModal(prev => !prev);
                alertaFail()
            })
        } else {
            alertaFotos()
        }
    };

    //muesta de las fotos agregadas en el drag n drop
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
    
    //antes de que renderise esta pagina, carga los detalles antiguas habitaciones
    useEffect(() => {
        if (num === 0) {
            const lista = []
            const ListaServicios = props.menu
            ListaServicios.map((h) => {
                const Complementos = h.Detalles
                Complementos.map((deta) => {
                    const { text } = deta
                    lista.push(text)
                })
            })

            const lista2 = lista.filter(function (elem, pos) {
                return lista.indexOf(elem) == pos;
            });

            setDetallesDrop(lista2)
            setNum(prevNum => prevNum + 1)
        }
    }, []);

    //agrega detalles nuevos
    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
    };

    //modifica detalles
    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    };

    //elimina detalles
    const removeTodo = id => {
        const removedArr = [...todos].filter(todo => todo.id !== id);

        setTodos(removedArr);
    };

    //agrega a la lista todos los detalles
    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const handleOpen = () => {
        setOpen(prevOpen => !prevOpen)
    }

    //crea y manda a agrear un detalle
    const agregarDelDrop = (e) => {
        console.log(e.target.name)
        const t = { id: Math.floor(Math.random() * 10000), text: e.target.name }
        addTodo(t)
    }

    //revisa si esta el modal esta en verdadero asi se muesta el modal o el form para agregar un menu
    return (
        <>
            {
                showModal ? <Loading showModal={showModal} setShowModal={setShowModal} />
                    : <div className="grid min-h-screen place-items-center">
                        <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-full">
                            <h1 className="text-xl font-semibold text-center">Ingrese información sobre el Menu</h1>
                            <form onSubmit={handleUpload} className="mt-6">
                                <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Nombre del Menu</label>
                                <input onChange={event => setNombre(event.target.value)} type="text" name="nombre" placeholder="Premium" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                                <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Detalles</label>

                                <div class="relative group inline-block">
                                    <div onClick={handleOpen} class="inline-flex justify-center w-full rounded-md shadow-sm px-40 py-2 bg-blue-900 text-sm font-medium text-white my-2">
                                        Detalles Pasados
                                            <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                        </svg>
                                    </div>

                                    <div class={open ? ("px-40 py-1 w-full absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5") : "hidden"}>
                                        {
                                            detallesDrop.map((text) => {
                                                return (
                                                    <a onClick={agregarDelDrop} name={text} class="block px-12 flex text-sm text-black border-b-2 border-transparent hover:border-blue-800">{text}</a>
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
                                <div>
                                    <button type="submit" class="w-full py-3 mt-10 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">Agregar Menu</button>
                                    <button class="w-full py-3 mt-10 font-medium tracking-widest text-white uppercase bg-red-600 shadow-lg focus:outline-none hover:bg-red-900 hover:shadow-none" onClick={() => { props.mostrarInicial() }}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
            }
        </>
    )
}

export default AgregarMenu