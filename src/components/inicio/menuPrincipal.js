import React, { useContext, useEffect, Fragment, useState } from 'react';
import AuthContext from '../../context/autenticacion/authContext';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MenuPrincipal = () => {

    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext;
    const [modalCerrar, setModalCerrar] = useState(false);



    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);

     //Confirma cerrar sesion
     const cerrar = (caso) => {
        if (caso === 'salir') { setModalCerrar(true) };
    }



    return (
        <Fragment>
            <header>

                <nav className="navegacion">

                    <ul className="menu">
                        {usuario ? <p className="nombre-usuario">Hola  <span>{usuario.nombres} </span> </p> : null}

                        <li><a href="/inicio">Inicio</a></li>

                        <li><a href="#">Productos</a></li>

                        <li><a href="#">Servicios</a>
                            <ul className="submenu">
                                <li><a href="/servicios">Lista de Servicios</a></li>
                                <li><a href="/nuevo-servicio">Crear Servicio</a></li>

                            </ul>
                        </li>
                        <li><a href="#">Empleados</a>
                            <ul className="submenu">
                                <li><a href="/empleados">Lista de Empleados</a></li>
                                <li><a href="/nuevo-empleado">Crear Empleado</a></li>

                            </ul></li>
                        <li><a href="#">Clientes</a>
                            <ul className="submenu">
                                <li><a href="/nueva-cuenta">Registrar Cliente</a></li>

                            </ul>
                        </li>
                        <li><a href="#">Registro de Ventas</a></li>
                        <li><a href="#">Agendar Citas</a></li>
                        <button
                            className="btn-cerrar"
                            onClick={() => cerrar('salir')}
                        >Cerrar Sesión</button>

                    </ul>
                </nav>
            </header>
            <Modal isOpen={modalCerrar}>
                <ModalBody>
                    Estás Seguro que deseas salir del sitio web?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => cerrarSesion()}
                    >Sí</button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => setModalCerrar(false)}
                    >No</button>
                </ModalFooter>
            </Modal>

        </Fragment>
    );
}

export default MenuPrincipal;