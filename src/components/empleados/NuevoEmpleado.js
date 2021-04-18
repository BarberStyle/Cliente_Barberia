import React, { Fragment, useState, useContext, useEffect } from 'react';
import AlertaContext from '../../context/alertas/alertaContext';
import EmpleadoContext from '../../context/empleados/empleadoContext';
import MenuPrincipal from '../inicio/menuPrincipal';





const NuevoEmpleado = () => {


    //obtener el state de las alertas y todas sus funciones
    const alertaContext = useContext(AlertaContext);

    //obtener el state de empleados y todas sus funciones
    const empleadoContext = useContext(EmpleadoContext);


    //Funciones para alertas
    const { alerta } = alertaContext;


    //extraer objetos del state
    const { mostrarError, errorformulario,
        agregarEmpleado, empleadoSeleccionado,
        limpiarEmpleado, actualizarEmpleado, tipoEmpleado } = empleadoContext;


    // Effect que detecta si hay un empleado seleccionado

    useEffect(() => {
        if (empleadoSeleccionado !== null) {
            guardarEmpleado(empleadoSeleccionado);
        } else {
            guardarEmpleado({
                tipo: '',
                documento: '',
                nombres: '',
                apellidos: '',
                correo: '',
                confirmarCorreo: '',
                telefono: '',
                fecha: '',
                perfil: '',
                contrasena: '',
                confirmarcontrasena: ''
            })
        }

    }, [empleadoSeleccionado]);

    //State para guardar los datos personales del empleado
    const [empleado, guardarEmpleado] = useState({
        tipo: '',
        documento: '',
        nombres: '',
        apellidos: '',
        correo: '',
        confirmarCorreo: '',
        telefono: '',
        fecha: '',
        perfil: '',
        contrasena: '',
        confirmarcontrasena: ''
    });

    //extraer atributos del empleado
    const { tipo, documento, nombres, apellidos, correo, telefono, fecha,
        perfil, contrasena, confirmarcontrasena, confirmarCorreo } = empleado;


    //funcion que lee los inputs
    const onChange = e => {
        const { name, value } = e.target;//destructure de los valores enviados por el metodo onchange de cada input

        if (name !== "telefono" && name !== "fecha" && name !== "documento" && name !== "correo" && name !== "confirmarCorreo"
            && name !== "confirmarcontrasena" && name !== "contrasena"

        ) {
            let regex = new RegExp("^[ñíóáéú a-zA-Z ]+$");
            for (let i = 0; i <= value.length - 1; i++) {
                let letra = value[i]
                if (!regex.test(letra) || !letra === " ") {
                    return;
                }
            }
        }
        guardarEmpleado({
            ...empleado,
            [name]: value
        })

    }

    //funcion onsubmit
    const onSubmit = e => {

        e.preventDefault();


        // Validar  de campos 
        if (tipo === '' || documento === null || nombres === '' || apellidos === '' ||
            correo === '' || confirmarCorreo === '' || telefono === null || fecha === '' ||
            perfil === '') {
            mostrarError();
            return;
        }

        if (empleadoSeleccionado === null) {
            // Password minimo de 6 caracteres
            if (contrasena.length < 6) {
                alert('La contrasena debe ser de minimo 6 caracteres');
                return;
            }

            // Los 2 passwords son iguales
            if (contrasena !== confirmarcontrasena) {
                alert('Las contrasenas no son iguales');
                return;
            }



            //valida contraseñas igualesY
            if (contrasena === '' || confirmarcontrasena === '') {
                mostrarError();
                return;
            }

        }

        // confirma que Los 2 correos son iguales

        if (correo !== confirmarCorreo) {
            alert('Los correos no son iguales');
            return;
        }


        if (documento <= 0) {
            alert("Ingrese un documento valido")
            return;
        }

        if (telefono <= 0) {
            alert("Ingrese un teléfono valido")
            return;
        }

        if (empleadoSeleccionado === null) {

            agregarEmpleado(empleado);


        } else {
            // actualizar empleado existente
            actualizarEmpleado(empleado);

            // Elimina empleado seleccionado del state
            limpiarEmpleado();

        }

        //reiniciar formulario
        limpiarForm();


        alert('Empleado guardado con exito');


    }


    const limpiarForm = () => {
        guardarEmpleado({
            tipo: '',
            documento: '',
            nombres: '',
            apellidos: '',
            correo: '',
            confirmarCorreo: '',
            telefono: '',
            fecha: '',
            perfil: '',
            contrasena: '',
            confirmarcontrasena: ''
        })

    }


    return (
        <Fragment>
            <MenuPrincipal />
            {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>
            ) : null}

            <form
                className="formulario-producto"
                onSubmit={onSubmit}
            >

                <div className="campos-obligatorios">
                    <h3>Los campos marcados con * son obligatorios</h3>
                </div>

                <h1>Nuevo Empleado</h1>
                <hr></hr>
                <br></br>

                <div className="row">

                    <div className="col-6">
                        <label className="asterisco">*</label>
                        <label htmlFor="tipo">Tipo Documento</label>
                        <input
                            type="text"
                            id="tipo"
                            name="tipo"
                            className="input-text"
                            placeholder="Tipo de Documento"
                            value={tipo}
                            onChange={onChange}
                        />
                    </div>
                    <div className="col-6">
                        <label className="asterisco">*</label>
                        <label htmlFor="documento">N° Documento</label>
                        <input
                            type="number"
                            id="documento"
                            name="documento"
                            className="input-text"
                            placeholder="Número de Doc."
                            value={documento}
                            onChange={onChange}

                        />
                    </div>
                </div>


                <div className="row">
                    <div className="col-6">
                        <label className="asterisco">*</label>

                        <label htmlFor="nombres">Nombres</label>
                        <input
                            type="text"
                            id="nombres"
                            name="nombres"
                            className="input-text"
                            placeholder="Tu nombre"
                            value={nombres}
                            onChange={onChange}
                        />
                    </div>

                    <div className="col-6">
                        <label className="asterisco">*</label>

                        <label htmlFor="apellidos">Apellidos</label>
                        <input
                            type="text"
                            id="apellidos"
                            name="apellidos"
                            className="input-text"
                            placeholder="Tus apellidos"
                            value={apellidos}
                            onChange={onChange}

                        />

                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <label className="asterisco">*</label>
                        <label htmlFor="correo">Correo Electrónico</label>
                        <input
                            type="email"
                            id="correo"
                            name="correo"
                            className="input-text"
                            placeholder="Tu Correo Electrónico"
                            value={correo}
                            onChange={onChange}

                        />
                    </div>

                    <div className="col-6">
                        <label className="asterisco">*</label>
                        <label htmlFor="confirmarCorreo">Confirmar Correo</label>
                        <input
                            type="email"
                            id="confirmarCorreo"
                            name="confirmarCorreo"
                            className="input-text"
                            placeholder="Confirma el correo"
                            value={confirmarCorreo}
                            onChange={onChange}

                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <label className="asterisco">*</label>
                        <label htmlFor="telefono">Teléfono</label>
                        <input
                            type="number"
                            id="telefono"
                            name="telefono"
                            className="input-text"
                            placeholder="Tu Teléfono"
                            value={telefono}
                            onChange={onChange}

                        />
                    </div>


                    <div className="col-6">
                        <label className="asterisco">*</label>
                        <label htmlFor="fecha">Fecha de Nacimiento</label>
                        <input
                            type="date"
                            id="fecha"
                            name="fecha"
                            className="input-text"
                            placeholder="Fecha en que naciste"
                            value={fecha}
                            onChange={onChange}

                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <label className="asterisco">*</label>
                        <label htmlFor="password">Perfil</label>
                        <select
                            type="text"
                            id="perfil"
                            name="perfil"
                            className="input-text"
                            placeholder="Perfil del empleado"
                            value={perfil}
                            onChange={onChange}

                        >  <option>--Seleccione--</option>
                            {tipoEmpleado.map(tipo => (
                                <option
                                    key={tipo._id}
                                >{tipo.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-6">
                        <label className="asterisco">*</label>

                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="contrasena"
                            name="contrasena"
                            className="input-text"
                            placeholder="Tu contrasena"
                            value={contrasena}
                            onChange={onChange}

                        />
                    </div>
                </div>


                <div className="row">
                    <div className="col-6">
                        <label className="asterisco">*</label>
                        <label htmlFor="confirmarcontrasena">Confirmar contraseña</label>
                        <input
                            type="password"
                            id="confirmarcontrasena"
                            name="confirmarcontrasena"
                            className="input-text"
                            placeholder="Confirma tu contrasena"
                            value={confirmarcontrasena}
                            onChange={onChange}

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

export default NuevoEmpleado;