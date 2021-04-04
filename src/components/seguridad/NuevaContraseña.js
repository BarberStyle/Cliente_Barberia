import React, { useState, useContext, useEffect, Fragment } from 'react';
import ContraseñaContext from '../../context/contraseñas/contrasenaContext';
import Barra from '../layout/Barra';
import AlertaContext from '../../context/alertas/alertaContext';


import { Link } from 'react-router-dom';

const NuevaContraseña = (props) => {

    const contraseñaContext = useContext(ContraseñaContext);
    const { errorformulario, validarRegistro, mensaje, usuarioConfirmado } = contraseñaContext;

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;



    useEffect(() => {

        if (!mensaje && usuarioConfirmado !== null) {
            props.history.push('/ingresar-codigo');

        }

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        // eslint-disable-next-line
    }, [mensaje, props.history, usuarioConfirmado]);


    const [validarUsuario, guardarUsuario] = useState({
        documento: '',
        correo: ''
    });

    const { documento, correo } = validarUsuario;

    const onChangeCambio = e => {

        const { name, value } = e.target;

        guardarUsuario({
            ...validarUsuario,
            [name]: value
        })

    }

    const onSubmitCambio = e => {


        e.preventDefault();

        // Validar que no haya campos vacios
        if (documento.trim() === '' || correo.trim() === '') {
            alert('Todos los campos son obligatorios');
        }

        if (documento <= 0) {
            alert('Número de documento invalido');
        }

        validarRegistro({ documento, correo });


    }


    return (
        <Fragment>
            <Barra />
            {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>) : null}


            <div className="form-usuario">

                <div className="contenedor-form sombra-dark">
                    <h1>Validar Datos</h1>
                    <hr/>
                    <br></br>
                    <form
                        onSubmit={onSubmitCambio}
                    >
                        <div className="campo-form">
                            <label htmlFor="documento">N° Documento</label>
                            <input
                                type="text"
                                id="documento"
                                name="documento"
                                className="camposNum"
                                placeholder="Tu numero de documento"
                                value={documento}
                                onChange={onChangeCambio}

                            />
                        </div>
                        <div className="campo-form">
                            <label htmlFor="correo">Correo Electrónico</label>
                            <input
                                type="email"
                                id="correo"
                                name="correo"
                                placeholder="Tu Correo Electrónico"
                                value={correo}
                                onChange={onChangeCambio}
                            />
                        </div>


                        <div className="campo-form">
                            <input type="submit" className="btn btn-primary btn-block" value="Validar" />
                        </div>
                    </form>
                    <Link to={'/iniciar-sesion'} className="enlace-cuenta">
                        Volver a iniciar sesión
                </Link>
                    {errorformulario ? (<p className="mensaje error">Todos los campos son Obligatorios</p>) : null}

                </div>
            </div>
        </Fragment>
    );
}

export default NuevaContraseña;