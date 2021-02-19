import React, { useState, useContext, Fragment } from 'react';
import EmpleadoContext from '../../context/empleados/empleadoContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';


const Empleado = ({ empleado }) => {


    //instanciar state de empleado
    const empleadoContext = useContext(EmpleadoContext);


    const { mostrarFormulario, eliminarEmpleado, guardarEmpleadoSeccionado } = empleadoContext;

    //state para modal
    const [modalEliminar, setModalEliminar] = useState(false);


    //cambiar formato de fecha
    var fecha = empleado.fecha;

    var nueva = fecha.split(" ")[0];
    var format = nueva.split("T");
    var ultima = format[0]



    //guardar servicio para editar o llama a eliminar
    const seleccionarEmpleado = (empleado, caso) => {
        if (caso === 'HojaVida') { setModalEliminar(true) };

        if (caso === 'Editar') {
            guardarEmpleadoSeccionado(empleado);
            mostrarFormulario();

        }
    }


    return (

        <Fragment>
            <table className="table sombra table-bordered">
                <thead>
                    <tr>
                        <th>Tipo Doc.</th>
                        <th>N° de documento</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Correo Electrónico</th>
                        <th>Teléfono</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Perfil</th>
                        <th>Acciones</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{empleado.tipo}</td>
                        <td>{empleado.documento}</td>
                        <td>{empleado.nombres}</td>
                        <td>{empleado.apellidos}</td>
                        <td>{empleado.correo}</td>
                        <td>{empleado.telefono}</td>
                        <td>{ultima}</td>
                        <td>{empleado.perfil}</td>
                        <button
                            className="btn btn-primary"
                            onClick={() => seleccionarEmpleado(empleado, 'Editar')}>
                            Editar</button>
                        <button
                            className="btn btn-danger"
                            onClick={() => seleccionarEmpleado(empleado, 'HojaVida')}>
                            Hoja de Vida</button>
                    </tr>

                </tbody>
            </table>

            <Modal isOpen={modalEliminar}>
                <ModalBody>
                    Estás Seguro que deseas eliminar el empleado
            </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => eliminarEmpleado(empleado._id)}
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

export default Empleado;