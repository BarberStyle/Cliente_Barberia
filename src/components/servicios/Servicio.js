import React, { Fragment, useContext, useEffect, useState } from 'react';
import ServicioContext from '../../context/servicios/servicioContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';




const Servicio = ({ servicio }) => {
    // Obtener el state de servicios
    const servicioContext = useContext(ServicioContext);
    const { eliminarServicio, guardarServicioSeccionado, servicioSeleccionado, mostrarFormulario } = servicioContext;
    const [modalEliminar, setModalEliminar] = useState(false);

    //Detecta servicio seleccionado para editar y direcciona
    useEffect(() => {
        if (servicioSeleccionado !== null) {
            // < Redirect to="/nuevo-servicio" />
        }
    }, [servicioSeleccionado]);


    //guardar servicio para editar o llama a eliminar
    const seleccionarServicio = (elemento, caso) => {
        if (caso === 'Eliminar') { setModalEliminar(true) };

        if (caso === 'Editar') {
            guardarServicioSeccionado(elemento);
            mostrarFormulario();


        }
    }

    return (
        <Fragment>
            <table className="table sombra table-bordered">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Duración(min)</th>
                        <th>Tipo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{servicio.nombre}</td>
                        <td>{servicio.precio}</td>
                        <td>{servicio.duracion}</td>
                        <td>{servicio.tipo}</td>
                        <button
                            className="btn btn-primary"
                            onClick={() => seleccionarServicio(servicio, 'Editar')}>
                            Editar</button>
                        <button
                            className="btn btn-danger"
                            onClick={() => seleccionarServicio(servicio, 'Eliminar')}>
                            Eliminar</button>
                    </tr>

                </tbody>
            </table>

            <Modal isOpen={modalEliminar}>
                <ModalBody>
                    Estás Seguro que deseas eliminar el servicio
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => eliminarServicio(servicio._id)}
                    >Sí</button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => setModalEliminar(false)}
                    >No</button>
                </ModalFooter>
            </Modal>

        </Fragment >

    );
}

export default Servicio;