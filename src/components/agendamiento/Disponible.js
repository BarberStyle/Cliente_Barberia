import React, { useState, useContext, Fragment } from 'react';
import CitaContext from '../../context/citas/citaContext';
import EmpleadoContext from '../../context/empleados/empleadoContext';
import 'bootstrap/dist/css/bootstrap.min.css';


const Disponible = ({ empleado }) => {


    //instanciar state de cita
    const citaContext = useContext(CitaContext);

    const empleadoContext = useContext(EmpleadoContext);


    const { mostrarCita } = citaContext;
    const { guardarEmpleadoDisponible } = citaContext;


    //state para modal
    const [modalEliminar, setModalEliminar] = useState(false);


    //cambiar formato de fecha
    var fecha = empleado.fecha;

    var nueva = fecha.split(" ")[0];
    var format = nueva.split("T");
    var ultima = format[0]



    //guardar servicio para editar o llama a eliminar
    const guardarDisponible = (empleado, caso) => {

        if (caso === 'Agendar') {
            guardarEmpleadoDisponible(empleado);
            mostrarCita();

        }
    }

    return (

        <Fragment>
            <table className="table sombra table-bordered">
                <thead>
                    <tr>
                
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Perfil</th>
                        <th>Acciones</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{empleado.nombres}</td>
                        <td>{empleado.apellidos}</td>
                        <td>{empleado.perfil}</td>
                        <button
                            className="btn btn-primary"
                            onClick={() => guardarDisponible(empleado, 'Agendar')}>
                            Ver Disponibilidad</button>

                    </tr>

                </tbody>
            </table>

        </Fragment >
    );
}

export default Disponible;