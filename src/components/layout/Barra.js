import React, { useContext, useEffect, Fragment, useState } from 'react';
import AuthContext from '../../context/autenticacion/authContext';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Barra = () => {

    // Extraer la información de autenticación
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
            <header className="app-header">
                {usuario ? <p className="nombre-usuario">Hola<span>{usuario.nombres} </span> </p> : null}

                {usuario ? (
                    <nav className="topnav">

                        <a href="/empleados">Empleados</a>
                        <a href="/servicios">Servicios</a>
                        <a href="/agendamiento">Agendamiento</a>

                        <a
                            className="topnav"
                            onClick={() => cerrar('salir')}
                        >Cerrar Sesión</a>
                    </nav>
                ) : null

                }


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

export default Barra;