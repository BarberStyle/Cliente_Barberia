import React, { useContext, useEffect } from 'react';
import ListaServicios from '../servicios/listadoServicios';
import AuthContext from '../../context/autenticacion/authContext';
import MenuPrincipal from '../inicio/menuPrincipal';


const Servicios = () => {

    // Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const {usuario,  usuarioAutenticado } = authContext;

    useEffect(() => {
        // eslint-disable-next-line
    }, [])

    return (
        <div className="contenedor-app">
            <div className="seccion-principal">
                <MenuPrincipal />
                <main>
                    <br></br>
                    <div className="contenedor-tareas">
                        <ListaServicios/>
                    </div>

                </main>
            </div>
        </div>
    );
}

export default Servicios;