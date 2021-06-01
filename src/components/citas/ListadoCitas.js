import React, { Fragment, useState, useEffect, useContext } from 'react';
import CitaContext from '../../context/citas/citaContext';
import BlockIcon from '@material-ui/icons/Block';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AgendamientoContext from '../../context/agendamiento/agendamientoContext';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

import {
    Table,
    Container
} from "reactstrap";

function buscandoFiltro(consult) {
    return function (x) {
        return x.docCliente.includes(consult) || !consult;
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: theme.typography.fontWeightRegular,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        width: 105

    },
    formControl: {
        minWidth: 200,

    }

}));

const ListadoCitas = () => {
    const classes = useStyles();
    let str;
    let str1;


    const [modalActualizar, setModalActualizar] = useState(false);

    const citaContext = useContext(CitaContext);

    const { obtenerCitas, citas, eliminacionCita, actualizarCita } = citaContext;


    const [consulta, guardarConsulta] = useState({
        consult: ''
    });

    const { consult } = consulta;

    const agendamientoContext = useContext(AgendamientoContext);

    const { estados } = agendamientoContext;

    useEffect(() => {

        obtenerCitas();
        // eslint-disable-next-line
    }, []);

    const onChangeBusqueda = e => {

        const { name, value } = e.target;
        guardarConsulta({
            ...consulta,
            [name]: value
        })

    }

    const eliminarCita = cita => {

        eliminacionCita(cita._id);
    }

    const cambiarEstado = cita => {

        switch (cita.Estado) {
            case 'Pendiente':
                cita.Estado = 'Cumplida';
                actualizarCita(cita);
                break;

            case 'Cumplida':
                cita.Estado = 'Incumplida';
                actualizarCita(cita);
                break;

            case 'Incumplida':
                cita.Estado = 'Cancelada';
                actualizarCita(cita);
                break;

            case 'Cancelada':
                cita.Estado = 'Pendiente';
                actualizarCita(cita);
                break;
            default:
                break;
        }
    }
    // revisar si citas tiene contenido
    if (citas.length === 0) {
        return <p>No hay citas, comienza creando una</p>
    }


    return (
        <Fragment>
            <div className="contenedor-basico sombra-dark">
                <h1>Listado de Citas</h1>
                <div className="barraBusqueda">
                    <input
                        type="number"
                        placeholder="Buscar"
                        className="textField"
                        name="consult"
                        value={consult}
                        onChange={onChangeBusqueda}
                    />
                </div>

                <br></br>
                <Container>
                    <Table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Doc. Cliente</th>
                                <th>Servicio</th>
                                <th>Doc. Empleado</th>
                                <th>Hora Inicio</th>
                                <th>Hora Fin</th>
                                <th>Costo</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {citas ? (
                                citas.filter(buscandoFiltro(consult)).map(cita => (
                                    str = new Date(cita.horaInicio),
                                    str1 = new Date(cita.horaFin),

                                    cita.horaInicio = str.toString(),
                                    cita.horaFin = str1.toString(),


                                    <tr key={cita._id}>
                                        <td>{cita.docCliente}</td>
                                        <td>{cita.Servicio}</td>
                                        <td>{cita.docEmpleado}</td>
                                        <td>{cita.horaInicio}</td>
                                        <td>{cita.horaFin}</td>
                                        <td>{cita.costo}</td>
                                        <td>{cita.Estado}</td>
                                        <td>

                                            {cita.Estado === 'Pendiente' ? (
                                                <a
                                                    className="btn btn-info espaciado"
                                                    onClick={() => cambiarEstado(cita)}
                                                > <ContactSupportIcon /> </a>

                                            ) : null}

                                            {cita.Estado === 'Cumplida' ? (
                                                <a
                                                    className="btn btn-primary espaciado"
                                                    onClick={() => cambiarEstado(cita)}
                                                > <AssignmentTurnedInIcon /> </a>

                                            ) : null}

                                            {cita.Estado === 'Incumplida' ? (
                                                <a
                                                    className="btn btn-secondary espaciado"
                                                    onClick={() => cambiarEstado(cita)}
                                                > <HighlightOffIcon /> </a>

                                            ) : null}

                                            {cita.Estado === 'Cancelada' ? (
                                                <a
                                                    className="btn btn-warning espaciado"
                                                    onClick={() => cambiarEstado(cita)}
                                                ><BlockIcon /> </a>

                                            ) : null}
                                            <a
                                                className="btn btn-danger"
                                                data-toggle="tooltip"
                                                title="Eliminar"
                                                onClick={() => eliminarCita(cita)}
                                            ><HighlightOffIcon /></a>
                                        </td>
                                    </tr>
                                )))
                                :
                                null}
                        </tbody>
                    </Table>
                </Container>
            </div>
        </Fragment>
    );
}

export default ListadoCitas;