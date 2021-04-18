import React, { useState, useContext, useEffect } from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';
import Barra from '../layout/Barra';
import Header from '../layout/Header';


const Login = (props) => {

    // extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

    // En caso de que el password o usuario no exista
    useEffect(() => {

        if (autenticado) {
            alert("Ingreso Exitoso");
            props.history.push('/inicio');

        }

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }


        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);


    // State para iniciar sesión
    const [usuario, guardarUsuario] = useState({
        documento: '',
        contraseña: ''
    });

    // extraer de usuario
    const { documento, contraseña } = usuario;



    const onChange = evento => {
        //destructurin de los valores enviados por el metodo onchange de cada input

        const { name, value } = evento.target;
        guardarUsuario({
            ...usuario,
            [name]: value
        })
    }

    // Cuando el usuario quiere iniciar sesión
    const onSubmit = e => {
        e.preventDefault();

        // Validar que no haya campos vacios
        if (documento.trim() === '' || contraseña.trim() === '') {
            alert('Todos los campos son obligatorios');
            return;
        }

        if (documento <= 0) {
            alert('Número de documento invalido');
            return;
        }

        
        //reinicia el form
        guardarUsuario({
            documento: '',
            contraseña: ''
        })

        if (documento.trim() !== '' || contraseña.trim() !== '') {
            iniciarSesion({ documento, contraseña });
        }

        // Pasarlo al action
     



    }


    return (
        <Fragment>
            <Header />

            <Barra />

            <div className="form-usuario">

                {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>) : null}


                <div className="contenedor-form sombra-dark">
                    <h1>Iniciar Sesión</h1>
                    <br></br>
                    <form
                        onSubmit={onSubmit}
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
                                onChange={onChange}
                            />
                        </div>

                        <div className="campo-form">
                            <label htmlFor="contraseña">Contraseña</label>
                            <input
                                type="password"
                                id="contraseña"
                                name="contraseña"
                                placeholder="Tu contraseña"
                                value={contraseña}
                                onChange={onChange}
                            />
                        </div>

                        <div className="campo-form">
                            <input type="submit" className="btn btn-primary btn-block" value="Iniciar Sesión" />
                        </div>
                    </form>

                    <Link to={'/cambio-contrasena'} className="olvido enlace-cuenta" >
                        Olvidaste la contraseña?
                </Link>
                </div>
            </div>

        </Fragment>
    );
}

export default Login;