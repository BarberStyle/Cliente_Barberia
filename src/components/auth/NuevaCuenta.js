import React, { useState, useContext, useEffect } from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';
import MenuPrincipal from '../inicio/menuPrincipal';
import Barra from '../layout/Barra';

const NuevaCuenta = (props) => {

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    // extraer los valores del context
    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    // En caso de que el password o usuario no exista
    useEffect(() => {
        if (autenticado) {
        }
        //si hay mensaje fue porque algo fallo
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);

    // State para iniciar sesión
    const [usuario, guardarUsuario] = useState({
        tipo: '',
        documento: '',
        nombres: '',
        apellidos: '',
        correo: '',
        confirmarCorreo: '',
        telefono: '',
        contraseña: '',
        confirmarContraseña: '',
        idPregunta: ''

    });

    // extraer de usuario
    const { tipo, documento, nombres, apellidos, correo,
        confirmarCorreo, telefono, contraseña, confirmarContraseña,
        idPregunta } = usuario;

    const onChange = evento => {

        //destructure de los valores enviados por el metodo onchange de cada input
        const { name, value } = evento.target;
        //no permite escribir numeros en el campo tipo
        if (name !== "telefono" && name !== "documento" && name !== "correo" && name !== "confirmarCorreo"
            && name !== "confirmarContraseña" && name !== "contraseña"

        ) {
            let regex = new RegExp("^[ñíóáéú a-zA-Z ]+$");
            for (let i = 0; i <= value.length - 1; i++) {
                let letra = value[i]
                if (!regex.test(letra) || !letra === " ") {
                    return;
                }
            }
        }

        guardarUsuario({
            ...usuario,
            [name]: value
        })
    }

    // Cuando el usuario quiere iniciar sesión
    const onSubmit = e => {
        e.preventDefault();

        // Validar que no haya campos vacios
        if (tipo.trim() === '' || documento.trim() === '' || nombres.trim() === '' || apellidos.trim() === '' ||
            correo.trim() === '' || confirmarCorreo.trim() === '' || telefono.trim() === '' ||
            contraseña.trim() === '' || confirmarContraseña.trim() === '') {
            alert('Todos los campos son obligatorios');
        }

        // Password minimo de 6 caracteres
        if (contraseña.length < 6) {
            alert('La contraseña debe ser de minimo 6 caracteres');
            return;
        }

        // Los 2 passwords son iguales
        if (contraseña !== confirmarContraseña) {
            alert('Las contraseñas no son iguales');
            return;
        }

        // Los 2 correos son iguales
        if (correo !== confirmarCorreo) {
            alert('Los correos no son iguales');
            return;
        }

        // Pasarlo al action
        registrarUsuario
            ({
                tipo,
                documento,
                nombres,
                apellidos,
                correo,
                telefono,
                contraseña,
                idPregunta

            });


        //limpiar form
        guardarUsuario({
            tipo: '',
            documento: '',
            nombres: '',
            apellidos: '',
            correo: '',
            confirmarCorreo: '',
            telefono: '',
            contraseña: '',
            confirmarContraseña: '',

        });

        alert('Registro del cliente exitoso');


    }

    return (
        <Fragment>
            <MenuPrincipal />
            <div className="form-usuario">
                {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>
                ) : null}
                <div className="contenedor-form sombra-dark">
                    <h1>Registrar Cliente</h1>

                    <form
                        onSubmit={onSubmit}
                    >
                        <div className="campo-form">
                            <label htmlFor="tipo">Tipo Documento</label>
                            <input
                                type="text"
                                id="tipo"
                                name="tipo"
                                placeholder="Tipo de Documento"
                                value={tipo}
                                onChange={onChange}
                            />

                        </div>
                        <div className="campo-form">
                            <label htmlFor="documento">N° Documento</label>
                            <input
                                type="number"
                                id="documento"
                                name="documento"
                                className="camposNum"
                                placeholder="Número de Documento"
                                value={documento}
                                onChange={onChange}
                            />
                        </div>
                        <div className="campo-form">
                            <label htmlFor="nombres">Nombres</label>
                            <input
                                type="text"
                                id="nombres"
                                name="nombres"
                                placeholder="Tu nombre"
                                value={nombres}
                                onChange={onChange}
                            />
                        </div>
                        <div className="campo-form">
                            <label htmlFor="apellidos">Apellidos</label>
                            <input
                                type="text"
                                id="apellidos"
                                name="apellidos"
                                placeholder="Tus apellidos"
                                value={apellidos}
                                onChange={onChange}
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
                                onChange={onChange}
                            />
                        </div>
                        <div className="campo-form">
                            <label htmlFor="confirmarCorreo">Confirmar Correo</label>
                            <input
                                type="email"
                                id="confirmarCorreo"
                                name="confirmarCorreo"
                                placeholder="Confirma el correo"
                                value={confirmarCorreo}
                                onChange={onChange}
                            />
                        </div>
                        <div className="campo-form">
                            <label htmlFor="telefono">Teléfono</label>
                            <input
                                type="number"
                                id="telefono"
                                name="telefono"
                                className="camposNum"
                                placeholder="Tu Teléfono"
                                value={telefono}
                                onChange={onChange}
                            />
                        </div>
                        <div className="campo-form">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="contraseña"
                                name="contraseña"
                                placeholder="Tu Contraseña"
                                value={contraseña}
                                onChange={onChange}
                            />
                        </div>
                        <div className="campo-form">
                            <label htmlFor="confirmarContraseña">Confirmar Contraseña</label>
                            <input
                                type="password"
                                id="confirmarContraseña"
                                name="confirmarContraseña"
                                placeholder="Confirma tu contraseña"
                                value={confirmarContraseña}
                                onChange={onChange}
                            />
                        </div>

                        <div className="campo-form">
                            <input type="submit" className="btn btn-primary btn-block" value="Registrar" />

                        </div>
                    </form>

                </div>
            </div>
        </Fragment>
    );
}

export default NuevaCuenta;