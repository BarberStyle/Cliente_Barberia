import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';

const RutaPrivada = ({ component: Component, ...props }) => {

    const authContext = useContext(AuthContext);
    const { autenticado, cargando, usuarioAutenticado,token } = authContext;

    useEffect(() => {
        // eslint-disable-next-line
        usuarioAutenticado();
    }, []);

    return (
        <Route {...props} render={props => !autenticado && !cargando ?  (
            <Redirect to="/" />
        ) : (
                <Component {...props} />
            )} />

    );
}

export default RutaPrivada;