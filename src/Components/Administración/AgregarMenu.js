import React, { useState, useMemo, useEffect } from 'react'
import { db } from '../../firebase'
import swal from 'sweetalert'
import { storage } from '../../firebase';
import { useDropzone } from 'react-dropzone';
import Items from '../AgregarItems/Items'
import Form from '../AgregarItems/Form'
import { TiMediaPlayOutline } from 'react-icons/ti';

function AgregarMenu(props) {

    const [Nombre, setNombre] = useState("");
    const [Precio, setPrecio] = useState("");
    const [files, setFiles] = useState([]);
    const [Url, setUrl] = useState([]);
    const [progress, setProgress] = useState(0);
    const [todos, setTodos] = useState([]);


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

    const handleUpload = async (event) => {
        event.preventDefault()
        let dirFotos = [];
        let uploadTask = null;
        if (files.length !== 0) {
            for (var i = 0; i < files.length; i++) {
                const nombreFoto = files[i].name;
                uploadTask = await storage.ref(`menu/${nombreFoto}`).put(files[i]);

                let Links = await storage
                    .ref("menu")
                    .child(nombreFoto)
                    .getDownloadURL()
                    .then(url => {
                        dirFotos.push(url)
                    });
            }

            db.collection("Menu").doc(Nombre).set({
                Nombre: Nombre,
                Precio: Precio,
                Detalles: todos,
                Url: dirFotos
            }).then(() => {
                alertaSuccess()
                props.mostrarInicial()
            }).catch(() => {
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

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);
    

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
            <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-full">
                <h1 className="text-xl font-semibold text-center">Ingrese información sobre el Menu</h1>
                <form onSubmit={handleUpload} className="mt-6">
                    <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Nombre del Menu</label>
                    <input onChange={event => setNombre(event.target.value)} type="text" name="nombre" placeholder="Premium" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                    <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Precio</label>
                    <input onChange={event => setPrecio(event.target.value)} type="number" name="precio" placeholder="800" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                    <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Detalles</label>

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
                    <button type="submit" class="w-full py-3 mt-10 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">Agregar Menu</button>
                </form>
            </div>
        </div>
    )
}

export default AgregarMenu