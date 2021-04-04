import React, { Fragment, useContext, useState, useEffect } from 'react';
import ProductoContext from '../../context/productos/productoContext';
import AlertaContext from '../../context/alertas/alertaContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
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

const ListadoProductos = () => {

    const productoContext = useContext(ProductoContext);
    const alertaContext = useContext(AlertaContext);
    /** */
    const { productos, obtenerProductos, actualizarProducto, mensaje } = productoContext;
    const { mostrarAlerta } = alertaContext;


    const [busquedas, guardarBusqueda] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        foto: '',
        unidades: '',
        estado: ''
    })


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
        // si hay un error
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerProductos();

        guardarBusqueda(productos);

        // eslint-disable-next-line
    }, [mensaje]);




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
        actualizarProducto(producto);

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
        actualizarProducto(producto);
    }


    // revisar si proyectos tiene contenido
    if (productos.length === 0) {
        return <p>No hay productos, comienza creando uno</p>
    }


    return (
        <Fragment>
            <h1>Listado de Productos</h1>

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
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Foto</th>
                            <th>Unidades</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {busquedas ? (
                            busquedas.filter(buscandoFiltro(consult)).map(producto => (
                                <tr>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.descripcion}</td>
                                    <td>{producto.precio}</td>
                                    <td>{producto.foto}</td>
                                    <td>{producto.disponibles}</td>
                                    <td>{producto.estado}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => mostrarModalActualizar(producto)}
                                        > Actualizar</button>{"  "}

                                        {producto.estado === 'Activo' ? (
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => cambiarEstado(producto)}
                                            >Desactivar</button>
                                        ) :
                                            (
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => cambiarEstado(producto)}
                                                > Activar </button>

                                            )}

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
                    <div><h3>Editar Producto</h3></div>
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        <label>Nombre</label>
                        <input
                            className="form-control"
                            type="text"
                            name="nombre"
                            value={nombre}
                            onChange={handleChange}

                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Descripción</label>
                        <input
                            className="form-control"
                            type="text"
                            name="descripcion"
                            value={descripcion}
                            onChange={handleChange}

                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Precio</label>

                        <input
                            className="form-control"
                            name="precio"
                            type="number"
                            value={precio}
                            onChange={handleChange}

                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Foto</label>

                        <input
                            className="form-control"
                            name="foto"
                            type="text"
                            value={foto}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Unidades</label>

                        <input
                            className="form-control"
                            name="disponibles"
                            type="number"
                            value={disponibles}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Estado</label>

                        <input
                            className="form-control"
                            name="estado"
                            type="text"
                            value={estado}
                            onChange={handleChange}
                            readOnly
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

export default ListadoProductos;