import React, { useState, useMemo } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import ListaClientes from './Administración/ListaClientes'
import Navbar from './Navbar'
import { storage } from '../firebase';
import {useDropzone} from 'react-dropzone';
import firebase from 'firebase'

const AdminMenu = function () {
  const [isClosed, setClosed] = React.useState(false)

  const isStatic = useMediaQuery({
    query: '(min-width: 640px)',
  })

  return (
    <Router>
      <Navbar/>
      <div className="flex bg-gray-100">
        {(isStatic || !isClosed) && (
          <aside
            aria-hidden={isClosed}
            className="bg-white w-64 min-h-screen flex flex-col"
          >
            <div className="bg-green-600 text-white font-bold border-r border-b px-4 h-10 flex items-center justify-between">
              <span className="text-blue py-2">Menu</span>
            </div>

<<<<<<< HEAD
            <div className="bg-gray-900 border-r py-4 flex-grow relative">
              <nav>
                <ul>
                  <li className="p-3 hover:bg-blue-900" >
                    <Link to="/Admin/Inicio" className="btn btn-primary text-white">Inicio</Link>
                  </li>
                  <li className="p-3 hover:bg-blue-900" >
                    <Link to="/Admin/Clientes" className="btn btn-primary text-white">Clientes</Link>
                  </li>
                  <li className="p-3 hover:bg-blue-900">
                    <Link to="/Admin/Restaurante" className="btn btn-primary text-white">Restaurante</Link>
                  </li>
                  <li className="p-3 hover:bg-blue-900">
                    <Link to="/Admin/Servicios" className="btn btn-primary text-white">Servicios</Link>
                  </li>
                </ul>
              </nav>

            </div>
          </aside>
        )}

        <main className="flex-grow flex flex-col min-h-screen">
          <header className="bg-green-600 border-b h-10 flex items-center justify-center">
            {!isStatic && (isClosed ? (
              <button
                tabIndex="1"
                className="w-10 p-1"
                aria-label="Abrir menu"
                title="Abrir menu"
                onClick={() => setClosed(false)}
=======
          <div className="bg-gray-900 border-r py-4 flex-grow relative">
            <nav>
              <ul>
                <li className="p-3 hover:bg-blue-900" >
                  <Link to="/administracion/Clientes" className="btn btn-primary text-white">Clientes</Link>
                </li>
                <li className="p-3 hover:bg-blue-900">
                  <Link to="/administracion/Restaurante" className="btn btn-primary text-white">Restaurante</Link>
                </li>
                <li className="p-3 hover:bg-blue-900">
                  <Link to="/administracion/Habitaciones" className="btn btn-primary text-white">Habitaciones</Link>
                </li>
              </ul>
            </nav>
            
          </div>
        </aside>
      )}
      
      <main className="flex-grow flex flex-col min-h-screen">
        <header className="bg-green-600 border-b h-10 flex items-center justify-center">
          {!isStatic && (isClosed ? (
            <button
              tabIndex="1"
              className="w-10 p-1"
              aria-label="Abrir menu"
              title="Abrir menu"
              onClick={() => setClosed(false)}
            >
              <svg
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          ) : (
            <button
              tabIndex="1"
              className="w-10 p-1"
              aria-label="Cerrar"
              title="Cerrar"
              onClick={() => setClosed(true)}
            >
              <svg
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="white"
>>>>>>> 33b560796209e918d38c655dc17f98764533c281
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            ) : (
                <button
                  tabIndex="1"
                  className="w-10 p-1"
                  aria-label="Cerrar"
                  title="Cerrar"
                  onClick={() => setClosed(true)}
                >
                  <svg
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="white"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              ))}

<<<<<<< HEAD
            <div className="flex flex-grow items-center justify-between px-3">
              <h1 className="text-lg text-white font-bold">Administración</h1>
              <button className="text-blue-700 underline">Salir de Sesion</button>
            </div>
          </header>

          <Switch>
            <Route path="/Admin/Inicio">
              <Inicio />
            </Route>
            <Route path="/Admin/Clientes">
              <Clientes />
            </Route>
            <Route path="/Admin/Restaurante">
              <Restaurante />
            </Route>
            <Route path="/Admin/Servicios">
              <Servicios />
            </Route>
          </Switch>
        </main>
      </div>
=======
          <div className="flex flex-grow items-center justify-between px-3">
            <h1 className="text-lg text-white font-bold">Administración</h1>
            <button className="text-blue-700 underline">Salir de Sesion</button>
          </div>
        </header>
        
        <Switch>
              <Route path="/administracion/Clientes">
                <Clientes/>
              </Route>
              <Route path="/administracion/Restaurante">
                <Restaurante/>
              </Route>
              <Route path="/administracion/Habitaciones">
                <Habitaciones/>
              </Route>
            </Switch>
      </main>
    </div>
    
>>>>>>> 33b560796209e918d38c655dc17f98764533c281
    </Router>
  )
}

function Inicio() {
  return (
    <div>
      <h1>
        this is home
      </h1>
    </div>
  )
}

function Clientes() {
  return (
    <ListaClientes />
  )
}

function Restaurante() {
  return (
    <div>
      <h1>
        this is restaurant
      </h1>
    </div>
  )
}

<<<<<<< HEAD
function Servicios() {
  return (
    <div>
      <h1>
        this is services
      </h1>
=======
function Habitaciones(props){

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ accept: 'image/jpeg, image/png, image/jpg', maxFiles:5})

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

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {(file.size / 1048576).toFixed(2)} Mb
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {(file.size / 1048576).toFixed(2)} Mb
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  const [image, setImage] = useState([]);
  const [url, setUrl] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
        });
      }
    );
  };
//<progress value={progress} max="100" />

  return(
    <div>
      <div className="container">
        <div {...getRootProps({style})}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          <em>(Maximo 5 fotos y solo tipo png, jpg y jpeg)</em>
        </div>
        <aside>
          <h4>Accepted files</h4>
          <ul>{acceptedFileItems}</ul>
          <h4>Rejected files</h4>
          <ul>{fileRejectionItems}</ul>
        </aside>
      </div>
>>>>>>> 33b560796209e918d38c655dc17f98764533c281
    </div>
  )
}

function EliminarUsuario(Id){
  firebase.firestore().collection('Usuarios').doc(Id).delete().then(function(){
    console.log("Cliente eliminado.");
  }).catch(function(error) {
    console.error("Error al eliminar cliente: ", error);
  });
}

export default AdminMenu;

