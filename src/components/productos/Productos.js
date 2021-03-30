import React, { useContext, useEffect } from 'react';
import ListaProductos from '../productos/ListadoProductos';
import AuthContext from '../../context/autenticacion/authContext';
import MenuPrincipal from '../inicio/menuPrincipal';


const Productos = () => {

    // Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;

    useEffect(() => {
        // eslint-disable-next-line
        usuarioAutenticado();
    }, [])

    return (
        <div className="contenedor-app">
            <div className="seccion-principal">
                <MenuPrincipal />
                <main>
                    <br></br>
                    <div className="contenedor-tareas">
                        <ListaProductos/>
                    </div>

                </main>
            </div>
        </div>
    );
}

export default Productos;