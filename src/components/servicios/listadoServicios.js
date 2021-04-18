import React, { Fragment, useContext, useEffect, useState } from 'react';
import ServicioContext from '../../context/servicios/servicioContext';
import AlertaContext from '../../context/alertas/alertaContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
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
        return x.nombre.toLowerCase().includes(consult) || !consult;
    }
}

const ListadoServicios = () => {

    const servicioContext = useContext(ServicioContext);
    const alertaContext = useContext(AlertaContext);
    /** */
    const { servicios, obtenerServicios,actualizarServicio, mensaje } = servicioContext;
    const { mostrarAlerta } = alertaContext;

    const [consulta, guardarConsulta] = useState({
        consult: ''
    });

    const [editable, guardarEditable] = useState({
        nombre: '',
        precio: '',
        duracion: '',
        tipo: ''
    })

    const [modalActualizar, setModalActualizar] = useState(false);


    const { consult } = consulta;
    const { nombre, precio, duracion, tipo } = editable;



    // Obtener proyectos cuando carga el componente
    useEffect(() => {
        // si hay un error
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerServicios();
        // eslint-disable-next-line
    }, [mensaje]);


    const onChangeBusqueda = e => {

        const { name, value } = e.target;


        guardarConsulta({
            ...consulta,
            [name]: value
        })

    }

    const handleChange = (e) => {
        guardarEditable({
            ...editable,
            [e.target.name]: e.target.value,

        });
    };

    const mostrarModalActualizar = (producto) => {
        setModalActualizar(true);
        guardarEditable(producto);

    };

    const cerrarModalActualizar = () => {
        guardarEditable({
            nombre: '',
            precio: '',
            duracion: '',
            tipo: ''
        });
        setModalActualizar(false);
    }

    const editar = servicio => {
        actualizarServicio(servicio);

        setModalActualizar(false);

        alert("Producto actualizado con éxito");

    }




    // revisar si proyectos tiene contenido
    if (servicios.length === 0) {
        return <p>No hay servicios, comienza creando uno</p>
    }

    return (
        <Fragment>
            <h1>Listado de Servicios</h1>

            <div className="barraBusqueda">
                <input
                    type="text"
                    placeholder="Buscar"
                    className="textField"
                    name="consult"
                    value={consult}
                    onChange={onChangeBusqueda}
                />
                <button type="button" className="btnBuscar" /*onClick={onClear}*/>
                    {" "}
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>

            <br></br>

            <Container>
                <Table>
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
                        {servicios ? (
                            servicios.filter(buscandoFiltro(consult)).map(servicio => (
                                <tr>
                                    <td>{servicio.nombre}</td>
                                    <td>{servicio.precio}</td>
                                    <td>{servicio.duracion}</td>
                                    <td>{servicio.tipo}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => mostrarModalActualizar(servicio)}
                                        > Actualizar</button>{"  "}


                                    </td>

                                </tr>
                            )))
                            :
                            null}

                    </tbody>
                </Table>
            </Container>

            <Modal isOpen={modalActualizar}>
                <ModalHeader>
                    <div><h3>Editar Servicio</h3></div>
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        <label>Nombre</label>
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Nombre Servicio"
                            name="nombre"
                            value={nombre}
                            onChange={handleChange}

                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Precio</label>
                        <input
                            type="number"
                            className="input-text"
                            placeholder="Precio Servicio"
                            name="precio"
                            value={precio}
                            onChange={handleChange}

                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Duración</label>
                        <input
                            type="number"
                            className="input-text"
                            placeholder="Duración (Min)"
                            name="duracion"
                            value={duracion}
                            onChange={handleChange}

                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Tipo</label>
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Tipo"
                            name="tipo"
                            value={tipo}
                            onChange={handleChange}

                        />
                    </FormGroup>

                </ModalBody>

                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => editar(editable)}
                    >
                        Editar
            </Button>
                    <Button
                        color="danger"
                        onClick={() => cerrarModalActualizar()}
                    >
                        Cancelar
            </Button>
                </ModalFooter>
            </Modal>


        </Fragment>
    );
}

export default ListadoServicios;