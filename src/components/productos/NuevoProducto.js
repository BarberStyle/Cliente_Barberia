import React, { Fragment, useContext, useState } from 'react';
import MenuPrincipal from '../inicio/menuPrincipal';
import AlertaContext from '../../context/alertas/alertaContext';
import ProductoContext from '../../context/productos/productoContext';
import "bootstrap/dist/css/bootstrap.min.css";


const NuevoProducto = () => {


    const alertaContext = useContext(AlertaContext);
    const productoContext = useContext(ProductoContext);

    const { errorformulario, agregarProducto, mostrarError } = productoContext;


    const { alerta } = alertaContext;

    const [producto, guardarProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        foto: '',
        disponibles: '',
        estado: ''

    });

    const { nombre, descripcion, precio, foto, disponibles, estado } = producto;




    // Lee los contenidos del input
    const onChangeProducto = evento => {

        //destructure de los valores enviados por el metodo onchange de cada input
        const { name, value } = evento.target;

        //expresion regular que no permite que en campos de texto se escriban numeros
        if (name !== "disponibles" && name !== "precio" && name !== "descripcion") {
            let regex = new RegExp("^[ñíóáéú a-zA-Z ]+$");
            for (let i = 0; i <= value.length - 1; i++) {
                let letra = value[i]
                if (!regex.test(letra) || !letra === " ") {
                    return;
                }
            }
        }

        guardarProducto({
            ...producto,
            [name]: value
        })

    }




    const onSubmitProducto = e => {

        e.preventDefault();

        // Validar  de campos 
        if (nombre === '' || descripcion === '' || precio === null || disponibles === null || estado === '') {
            mostrarError();
            return;
        }

        if (precio <= 0) {
            alert("Ingrese un precio valido")
            return;
        }

        if (disponibles <= 0) {
            alert("Ingrese la cantidd de unidades disponibles")
            return;
        }

        if (estado === '--Selecione--') {
            alert("Ingrese un estado valido")
            return;
        }

        agregarProducto(producto);


        limpiarForm();
        alert('Agregado con exito');


    }

    const limpiarForm = () => {
        guardarProducto({
            nombre: '',
            descripcion: '',
            precio: '',
            foto: '',
            disponibles: '',
            estado: ''

        });

    }


    return (
        <Fragment>
            <MenuPrincipal />
            {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>
            ) : null}

            <form
                className="formulario-producto"
                onSubmit={onSubmitProducto}
            >
                <div className="campos-obligatorios">
                    <h3>Los campos marcados con * son obligatorios</h3>
                </div>

                <h1>Nuevo Producto</h1>
                <hr></hr>
                <br></br>
                <div className="row">

                    <div className="col-6">
                        <label className="asterisco">*</label>
                        <label>Nombre</label>
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Nombre Producto"
                            name="nombre"
                            value={nombre}
                            onChange={onChangeProducto}

                        />
                    </div>

                    <div className="col-6">
                        <label className="asterisco">*</label>
                        <label>Descripción</label>
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Tamaño, medida, marca, proveedor"
                            name="descripcion"
                            value={descripcion}
                            onChange={onChangeProducto}

                        />
                    </div>

                </div>

                <div className="row">
                    <div className="col-6">
                        <label className="asterisco">*</label>
                        <label>Precio</label>
                        <input
                            type="number"
                            className="input-text"
                            placeholder="Precio del Producto"
                            name="precio"
                            value={precio}
                            onChange={onChangeProducto}

                        />
                    </div>

                    <div className="col-6">
                        <label>Foto</label>
                        <input
                            type="file"
                            className="input-text"
                            name="foto"
                            value={foto}
                            onChange={onChangeProducto}

                        />
                    </div>


                </div>

                <div className="row">
                    <div className="col-6">
                        <label className="asterisco">*</label>
                        <label>Unidades</label>
                        <input
                            type="number"
                            className="input-text"
                            placeholder="Unidades Disponibles"
                            name="disponibles"
                            value={disponibles}
                            onChange={onChangeProducto}
                        />
                    </div>

                    <div className="col-6">
                        <label className="asterisco">*</label>
                        <label>Estado</label>
                        <select
                            className="input-text"
                            placeholder="Activo o Inactivo"
                            name="estado"
                            value={estado}
                            onChange={onChangeProducto}

                        >
                            <option>--Seleccione--</option>
                            <option>Activo</option>
                            <option>Inactivo</option>

                        </select>
                    </div>

                </div>
                <div className="row">


                    <div className="col-6">
                        <input
                            type="submit"
                            className="btn btn-primary btn-block"
                            value="Ingresar"
                        />
                    </div>

                    <div className="col-6">
                        <input
                            className="btn btn-primary"
                            className="btn btn-primary btn-block"
                            onClick={() => limpiarForm()}
                            value="Limpiar"
                        />
                    </div>
                </div>



            </form>
            {errorformulario ? (<p className="mensaje error">Todos los campos son Obligatorios</p>) : null}


        </Fragment>


    );




}

export default NuevoProducto;