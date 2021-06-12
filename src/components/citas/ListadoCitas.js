import React, { Fragment, useState, useEffect, useContext } from 'react';
import CitaContext from '../../context/citas/citaContext';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AgendamientoContext from '../../context/agendamiento/agendamientoContext';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';

import {
    Table,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
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


    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalIncumplimiento, setModalIncumplimiento] = useState(false);
    const [modalLiberacion, setModalLiberacion] = useState(false);
    const [puntos, guardarPuntos] = useState({
        cantidad: '',
        docCliente: ''
    })

    const [eliminable, guardarEliminable] = useState('');
    const [cita, guardarCita] = useState({
        _id: '',
        docCliente: '',
        Servicio: '',
        docEmpleado: '',
        horaInicio: '',
        horaFin: '',
        costo: '',
        Estado: ''
    });

    const { cantidad, docCliente } = puntos;

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

    const eliminarCita = (cita) => {
        eliminacionCita(cita);
        setModalEliminar(false);

    }

    const cambiarEstado = cita => {

        switch (cita.Estado) {
            case 'Pendiente':
                cita.Estado = 'Incumplida';
                actualizarCita(cita);
                break;
            case 'Incumplida':
                cita.Estado = 'Cumplida';
                actualizarCita(cita);
                break;
            case 'Cumplida':
                cita.Estado = 'Pendiente';
                actualizarCita(cita);
                calcularPuntos(cita.costo, cita.docCliente);
                break;
            default:
                break;
        }

        setModalIncumplimiento(false);
        setModalLiberacion(false);
    }

    const mostrarModalEliminar = (cita) => {
        setModalEliminar(true);
        guardarEliminable(cita._id);
    };

    const cerrarModalEliminar = () => {
        setModalEliminar(false);
    }

    const mostrarModalIncumplimiento = (cita) => {
        setModalIncumplimiento(true);
        guardarCita(cita);
    }

    const mostrarModalLiberacion = (cita) => {
        setModalLiberacion(true);
        guardarCita(cita);
    }

    const calcularPuntos = (costo, docCliente) => {
        let cantidad = (5 / 100) * costo;
        console.log(cantidad);

        guardarPuntos(cantidad, docCliente)
        console.log(puntos);

    }

    // revisar si hay empleados registrados
    if (citas.length === 0) {
        return <p >NO HAY CITAS, COMIENZA CREANDO UNA</p>
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
                    <Table className="table table-striped responsive">
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
                                                    onClick={() => mostrarModalIncumplimiento(cita)}
                                                > <ContactSupportIcon /> </a>

                                            ) : null}
                                            {cita.Estado === 'Incumplida' ? (
                                                <a
                                                    className="btn btn-secondary espaciado"
                                                    onClick={() => mostrarModalLiberacion(cita)}
                                                > <HighlightOffIcon /> </a>

                                            ) : null}

                                            {cita.Estado === 'Cumplida' ? (
                                                <a
                                                    className="btn btn-success espaciado"
                                                > <AssignmentTurnedInIcon /> </a>

                                            ) : null}

                                            <a
                                                className="btn btn-danger"
                                                data-toggle="tooltip"
                                                title="Eliminar"
                                                onClick={() => mostrarModalEliminar(cita)}
                                            // onClick={() => eliminarCita(cita)}
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

            <Modal isOpen={modalEliminar}>
                <ModalHeader>
                    <h3>Advertencia</h3>
                </ModalHeader>
                <ModalBody>
                    <WarningRoundedIcon />
                    <div className="text-alert">
                        <span className="warning"><WarningRoundedIcon /></span><br></br>
                        ¿Seguro que desea eliminar la cita?
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => eliminarCita(eliminable)}
                    > Eliminar</Button>

                    <Button
                        color="danger"
                        onClick={() => cerrarModalEliminar()}
                    > Cancelar </Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalIncumplimiento}>
                <ModalHeader>
                    <h3>Advertencia</h3>
                </ModalHeader>
                <ModalBody>
                    <div className="text-alert">
                        <span className="warning"><WarningRoundedIcon /></span><br></br>
                        ¿Seguro que desea cambiar el estado de la cita a incumplido?
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => cambiarEstado(cita)}
                    > Confirmar</Button>
                    <Button
                        color="danger"
                        onClick={() => setModalIncumplimiento(false)}
                    > Cancelar </Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalLiberacion}>
                <ModalHeader>
                    <h3>Advertencia</h3>
                </ModalHeader>
                <ModalBody>
                    <div className="text-alert">
                        <span className="warning"><WarningRoundedIcon /></span><br></br>
                        ¿Seguro que desea cambiar el estado de la cita a cumplida?
                        ¡Se liberarán los puntos del cliente!
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => cambiarEstado(cita)}
                    > Confirmar</Button>

                    <Button
                        color="danger"
                        onClick={() => setModalLiberacion(false)}
                    > Cancelar </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
}

export default ListadoCitas;