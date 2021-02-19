import React, {useContext, useEffect} from 'react';
import Sidebar from '../layout/SidebarEmpleados';
import ListaEmpleados from '../empleados/ListadoEmpleados';
import Barra from '../layout/Barra';
import AuthContext from '../../context/autenticacion/authContext';
import { Fragment } from 'react';


const Empleados = () => {


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
                        <ListaEmpleados />
                    </div>

                </main>
            </div>
        </div>);
}

export default Empleados;