import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import ListaServicios from '../servicios/listadoServicios';
import AuthContext from '../../context/autenticacion/authContext';
import Barra from '../layout/Barra';


const Servicios = () => {

    // Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="contenedor-app">
            <Sidebar />
            <div className="seccion-principal">
                <Barra />
                <main>
                    <br></br>
                    <div className="contenedor-tareas">
                        <ListaServicios />

                    </div>

                </main>
            </div>
        </div>
    );
}

export default Servicios;