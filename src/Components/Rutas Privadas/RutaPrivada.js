import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom"
import { AuthContext } from "./Rutas Privadas/Auth"

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const { currentUser } = useContext(AuthContext);
    return (
        <Route {...rest}
            render={routeProps =>
                !!currentUser ? (
                    <RouteComponent {...routeProps} />
                ) : (
                        <Redirect to={"/"} />
                    )
            }
        />
    );
};
{/* Cambiar el redirect to*/}
export default PrivateRoute