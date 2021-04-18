import React, { Fragment, useState, useContext, useEffect } from 'react';
import ServicioContext from '../../context/servicios/servicioContext';
import AlertaContext from '../../context/alertas/alertaContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuPrincipal from '../inicio/menuPrincipal';

const NuevoServicio = () => {

    // Obtener el state del formulario
    const servicioContext = useContext(ServicioContext);
    const alertaContext = useContext(AlertaContext);

    const { errorformulario,
        servicioSeleccionado, agregarServicio, mostrarError,
        actualizarServicio, limpiarServicio } = servicioContext;
    const { alerta } = alertaContext;

    // Effect que detecta si hay un servicio seleccionado
    useEffect(() => {
        if (servicioSeleccionado !== null) {
            guardarServicio(servicioSeleccionado)

        } else {
            guardarServicio({
                nombre: '',
                precio: '',
                duracion: '',
                tipo: ''

            })
        }
    }, [servicioSeleccionado]);

    // State para Servicio
    const [servicio, guardarServicio] = useState({
        nombre: '',
        precio: '',
        duracion: '',
        tipo: ''
    });

    // Extraer nombre de proyecto
    const { nombre, precio, duracion, tipo } = servicio;


    // Lee los contenidos del input
    const onChangeServicio = evento => {

        //destructure de los valores enviados por el metodo onchange de cada input
        const { name, value } = evento.target;
        if (name !== "duracion" && name !== "precio") {
            let regex = new RegExp("^[ñíóáéú a-zA-Z ]+$");
            for (let i = 0; i <= value.length - 1; i++) {
                let letra = value[i]
                if (!regex.test(letra) || !letra === " ") {
                    return;
                }
            }
        }
        guardarServicio({
            ...servicio,
            [name]: value
        })

    }


    // Cuando el usuario envia un proyecto
    const onSubmitServicio = e => {
        e.preventDefault();

        // Validar  de campos 
        if (nombre === '' || precio === null || duracion === null || tipo === '') {
            mostrarError();
            return;
        }

        if (precio <= 0) {
            alert("Ingrese un costo valido")
            return;
        }

        if (duracion <= 0) {
            alert("Ingrese el tiempo en minutos")
            return;
        }


        // Si es edición o si es nuevo servicio
        if (servicioSeleccionado === null) {

            // agregar la el servicio al state de servicios
            agregarServicio(servicio);
        } else {
            // actualizar servicio existente
            actualizarServicio(servicio);


            // Elimina servicio seleccionado del state
            limpiarServicio();
        }
        //mensaje de confirmacion

        alert("Servicio guardado con exito");
        // Reiniciar el form
        
        limpiarForm();
    }

    const limpiarForm = () => {
        guardarServicio({
            nombre: '',
            precio: '',
            duracion: '',
            tipo: ''
        })

    }

    return (
        <Fragment>
            <MenuPrincipal />
            {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>
            ) : null}

            <form
                className="formulario-producto"
                onSubmit={onSubmitServicio}
            >
                <div className="campos-obligatorios">
                    <h3>Los campos marcados con * son obligatorios</h3>
                </div>

                <h1>Nuevo Servicio</h1>
                <hr></hr>
                <br></br>

                <div className="row">

                    <div className="col-6">
                        <label className="asterisco">*</label>
                        <label>Nombre</label>
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Nombre Servicio"
                            name="nombre"
                            value={nombre}
                            onChange={onChangeServicio}
                        />
                    </div>

                    <div className="col-6">

                        <label className="asterisco">*</label>
                        <label>Precio</label>
                        <input
                            type="number"
                            className="input-text"
                            placeholder="Precio Servicio"
                            name="precio"
                            value={precio}
                            onChange={onChangeServicio}
                        />
                    </div>
                </div>


                <div className="row">

                    <div className="col-6">
                        <label className="asterisco">*</label>
                        <label>Duración</label>
                        <input
                            type="number"
                            className="input-text"
                            placeholder="Duración (Min)"
                            name="duracion"
                            value={duracion}
                            onChange={onChangeServicio}
                        />
                    </div>

                    <div className="col-6">

                        <label className="asterisco">*</label>
                        <label>Tipo</label>
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Tipo"
                            name="tipo"
                            value={tipo}
                            onChange={onChangeServicio}
                        />
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

export default NuevoServicio;