import React, { useContext, useEffect, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from '../../context/autenticacion/authContext';



const MenuPrincipal = () => {

    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;


    useEffect(() => {

        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);


    return (
        <Fragment>
            <header>

                <nav className="navegacion">

                    <ul className="menu">

                        <li><a href="/inicio">Inicio</a></li>

                        <li><a href="/productos">Productos</a>
                            <ul className="submenu">
                                <li><a href="/productos">Lista de Productos</a></li>
                                <li><a href="/nuevo-producto">Crear Producto</a></li>

                            </ul>
                        </li>

                        <li><a href="/servicios">Servicios</a>
                            <ul className="submenu">
                                <li><a href="/servicios">Lista de Servicios</a></li>
                                <li><a href="/nuevo-servicio">Crear Servicio</a></li>

                            </ul>
                        </li>
                        <li><a href="/empleados">Empleados</a>
                            <ul className="submenu">
                                <li><a href="/empleados">Lista de Empleados</a></li>
                                <li><a href="/nuevo-empleado">Crear Empleado</a></li>

                            </ul>
                        </li>
                        <li><a href="/clientes">Clientes</a>
                            <ul className="submenu">
                                <li><a href="/clientes">Lista de Clientes</a></li>
                                <li><a href="/nueva-cuenta">Crear Cliente</a></li>

                            </ul>
                        </li>


                        <li><a href="/empleados">Registro de Ventas</a></li>

                        <li><a href="/agendamiento">Agendamiento</a>

                            <ul className="submenu">
                                <li><a href="/agendamiento">Agendar Cita</a></li>

                            </ul>
                        </li>


                    </ul>
                </nav>
            </header>


        </Fragment>
    );
}

export default MenuPrincipal;