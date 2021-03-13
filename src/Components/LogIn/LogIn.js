import firebase from 'firebase'
import { auth } from '../../firebase'
import React, { useCallback, useContext } from 'react'
import { Redirect } from "react-router";
import { AuthContext } from "../Rutas Privadas/Auth"
import { Link } from 'react-router-dom';
import imagen from "./loginImagen.jpg"

export default function LogIn({ history }) {

    //funcion que autentica por google
    const authGoogle = async () => {
        var user = auth.currentUser;
        if (user) {
            alert("Debes cerrar sesión primero")
        } else {
            const provider = new firebase.auth.GoogleAuthProvider();
            await auth.signInWithPopup(provider).then(result => {
                if (result.additionalUserInfo.isNewUser) {
                    history.push("/signup")
                } else {
                    history.push("/");
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const handleEmailLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await auth.signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]

    );

    const currentUser = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <>
            <body background={imagen} >
                <div className="bg-fixed" style={{backgroundImage:`url(${"https://yosoypuebla.com/directorio/wp-content/uploads/2018/04/hotel-posada-cuetzalan-alberca.jpg"})`}}>
                    <div className="grid min-h-screen place-items-center" >

                        <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-6/12">
                            <h1 className="text-center font-bold text-lg text-gray-400">
                                Inicio de Sesión
                            </h1>
                            <form onSubmit={handleEmailLogin}>
                                <label htmlFor="email" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">E-mail</label>
                                <input id="email" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" type="email" name="email" placeholder="john.doe@company.com" autoComplete="email" required />

                                <label htmlFor="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Contraseña</label>
                                <input id="password" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" type="password" name="password" placeholder="********" autoComplete="new-password" required />

                                <div className="flex flex-row-reverse mt-4">
                                    <div>
                                        <Link to="/recuperarContra" className="text-right text-xs text-gray-500 cursor-pointer hover:text-black"> ¿Olvidaste tu contraseña?</Link>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 mt-4 place-items-center">
                                    <div className="flex col-span-2 bg-black hover:bg-gray-900 m-3 h-12 w-full items-center shadow-lg rounded cursor-pointer focus:outline-none">
                                        <button type="submit" className="mx-1 text-center w-full text-sm font-semibold text-white text-opacity-90">
                                            Iniciar Sesión
                                        </button>
                                    </div>

                                    <div className="flex col-span-2 lg:col-span-1 bg-white hover:bg-gray-100 m-3 h-12 w-64 shadow-lg rounded cursor-pointer" onClick={authGoogle}>
                                        <svg className="fill-current mx-4 h-6 w-6 self-center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M113.47 309.408L95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z" fill="#fbbb00" />
                                            <path d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z" fill="#518ef8" />
                                            <path d="M416.253 455.624l.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z" fill="#28b446" />
                                            <path d="M419.404 58.936l-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z" fill="#f14336" />
                                        </svg>
                                        <div className="self-center mx-1 text-center text-sm font-semibold text-gray-500 text-opacity-90">
                                            Continua con Google
                                        </div>
                                    </div>
                                    <Link to="/signup">
                                        <div className="flex col-span-2 lg:col-span-1 bg-black hover:bg-gray-900 m-3 h-12 w-64 shadow-lg rounded cursor-pointer">
                                            <svg className="fill-current mx-4 h-6 w-6 text-white self-center" viewBox="0 0 511.996 511.996" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M230.9 253.371c13.369 8.913 36.827 8.914 50.199-.001l.007-.004 227.865-151.911c-7.474-21.616-28.018-37.188-52.142-37.188H55.166c-24.125 0-44.668 15.572-52.143 37.188l227.87 151.912.007.004z" />
                                                <path d="M297.746 278.328l-.007.005c-11.702 7.801-26.724 11.702-41.741 11.702-15.02 0-30.036-3.9-41.739-11.703l-.005-.003L0 135.494v257.072c0 30.417 24.747 55.163 55.166 55.163h401.666c30.418 0 55.164-24.746 55.164-55.163V135.494z" />
                                            </svg>
                                            <div className="self-center mx-1 text-center text-sm font-semibold text-white text-opacity-90">
                                                Regístrate por Correo
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </body>
        </>
    )
}
