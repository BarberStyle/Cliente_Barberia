import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/autenticacion/authContext';
import ListaDisponibles from './ListadoDisponibles';
import Sidebar from '../layout/SidebarAgendamiento';
import Barra from '../layout/Barra';



const Agendamientos = () => {
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
                        <ListaDisponibles />
                    </div>

                </main>
            </div>
        </div>
    );
}

export default Agendamientos;