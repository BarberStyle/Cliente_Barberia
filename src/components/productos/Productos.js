import React, { useContext, useEffect } from 'react';
import ListaProductos from '../productos/ListadoProductos';
import AuthContext from '../../context/autenticacion/authContext';
import MenuPrincipal from '../inicio/menuPrincipal';
import Header from '../layout/Header';


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
                <Header />
                <MenuPrincipal />
                <div className="contenedor-principal">
                    <main>
                        <br></br>
                        <div className="contenedor-tareas">
                            <ListaProductos />
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
}

export default Productos;