import React, { Fragment, useContext, useState, useEffect } from 'react';
import CitaContext from '../../context/citas/citaContext';
import "bootstrap/dist/css/bootstrap.min.css";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

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

const ListadoPuntos = () => {

    const citaContext = useContext(CitaContext);
    const { puntos, obtenerPuntaje } = citaContext;
    const [consulta, guardarConsulta] = useState({
        consult: ''
    });

    const [editable, guardarEditable] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        foto: '',
        disponibles: '',
        estado: ''
    })

    const [modalActualizar, setModalActualizar] = useState(false);


    const { consult } = consulta;

    const { nombre, descripcion, precio, foto, disponibles, estado } = editable;

    // Obtener proyectos cuando carga el componente
    useEffect(() => {

        obtenerPuntaje();
        // eslint-disable-next-line
    }, []);

    const onChangeBusqueda = e => {

        const { name, value } = e.target;

        guardarConsulta({
            ...consulta,
            [name]: value
        })

    }


    const mostrarModalActualizar = (producto) => {
        setModalActualizar(true);
        guardarEditable(producto);

    };

    const cerrarModalActualizar = () => {
        guardarEditable({
            nombre: '',
            descripcion: '',
            precio: '',
            foto: '',
            disponibles: '',
            estado: ''
        });
        setModalActualizar(false);
    }

    const editar = producto => {

        setModalActualizar(false);

        alert("Producto actualizado con éxito");

    }


    const handleChange = (e) => {
        guardarEditable({
            ...editable,
            [e.target.name]: e.target.value,

        });
    };

    const cambiarEstado = producto => {
        if (producto.estado === 'Activo') {
            producto.estado = 'Inactivo';
        } else {
            producto.estado = 'Activo'
        }
    }


    // revisar si puntos tiene contenido
    if (puntos.length === 0) {
        return <p>No hay puntos, comienza creando uno</p>
    }


    return (
        <Fragment>
            <div className="contenedor-basico sombra-dark">
                <h1>Listado de Puntos</h1>

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
                <Container >
                    <Table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Doc. Cliente</th>
                                <th>Cantidad</th>
                                <th>Estado</th>
                                <th>Fecha de Liberación</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {puntos ? (
                                puntos.filter(buscandoFiltro(consult)).map(punto => (
                                    <tr key={punto._id}>
                                        <td>{punto.docCliente}</td>
                                        <td>{punto.cantidad}</td>
                                        <td>{punto.estado}</td>
                                        <td>{punto.creado}</td>

                                        <td>
                                            <button
                                                className="btn btn-primary"
                                            > <EditIcon /></button>{"  "}

                                            {punto.estado === 'Activo' ? (
                                                <button
                                                    className="btn btn-success"
                                                ><AssignmentTurnedInIcon /></button>
                                            ) :
                                                (
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => cambiarEstado(punto)}
                                                    > <HighlightOffIcon /> </button>

                                                )}

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

export default ListadoPuntos;