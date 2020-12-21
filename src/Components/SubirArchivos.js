import React, { useState, useMemo, useEffect } from 'react'
import { storage } from '../firebase';
import {useDropzone} from 'react-dropzone';

function SubirArchivos() {
        const {
            getRootProps,
            getInputProps,
            isDragActive,
            isDragAccept,
            isDragReject
          } = useDropzone({ accept: 'image/jpeg, image/png, image/jpg', maxFiles:5, onDrop: acceptedFiles => {
              setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
              })));
          }})
        
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
        
          const [image, setImage] = useState([]);
          const [url, setUrl] = useState("");
          const [progress, setProgress] = useState(0);
        
          const handleUpload = () => {
            for (var i = 0; i < image.length; i++) {
              const nombreFoto = image[i].name;
              const uploadTask = storage.ref(`images/${nombreFoto}`).put(image[i]);
        
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
                    .child(nombreFoto)
                    .getDownloadURL()
                    .then(url => {
                      setUrl(url);
                      console.log(url)
                  });
                  
                }
              );
            }
          };
        
        //<progress value={progress} max="100" />
        const [files, setFiles] = useState([]);
        
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
        
        const handleFiles = () => {
          for (var i = 0; i < files.length; i++) {
            const archivo = files[i]
            setImage(prevImg => [...prevImg, archivo])
          }
          setFiles([])
          for (var i=0; i < image.length; i++){
            console.log(image[i])
          }
        };
        
        useEffect(() => () => {
          // Make sure to revoke the data uris to avoid memory leaks
          files.forEach(file => URL.revokeObjectURL(file.preview));
        }, [files]);

        return(
            <div>
              <section className="container">
                <div {...getRootProps({className: 'dropzone',style})}>
                  <input onChange={handleFiles} {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                <aside style={thumbsContainer}>
                  {thumbs}
                </aside>
              </section>
              <div class="grid grid-cols-2 place-items-center py-4">
                <button class="bg-gray-900 hover:bg-gray-700 text-white text-base font-semibold px-6 py-2 rounded-lg focus:outline-none focus:shadow-outline" onClick={handleFiles}>check</button>
                <button class="bg-gray-900 hover:bg-gray-700 text-white text-base font-semibold px-6 py-2 rounded-lg focus:outline-none focus:shadow-outline" onClick={handleUpload}>subir</button>
              </div>
              <div class="grid grid-cols-1 place-items-center py-4">
                <progress  value={progress} max="100" />
              </div>
            </div>
        )
    }    


export default SubirArchivos