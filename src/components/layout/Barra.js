import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Barra = () => {



    return (
        <Fragment>

            <header className="App-header">

                <nav className="topnav">
                    <Link to="/iniciar-sesion">Iniciar Sesión</Link>
                    <Link to="/galeria">Galeria</Link>
                    <Link to="/empleados">Empleados</Link>
                    <Link to="/servicios">Servicios</Link>
                    <Link to="/servicios">Productos</Link>
                    <Link to="/servicios">Contacto</Link>
                    <Link to="/somos">Quiénes somos</Link>
                </nav>

            </header>

        </Fragment>
    );
}

export default Barra;