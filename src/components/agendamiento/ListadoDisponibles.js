import React, { useContext, useEffect, Fragment, useState } from 'react';
import EmpleadoContext from '../../context/empleados/empleadoContext';
import Disponible from './Disponible';
import AlertaContext from '../../context/alertas/alertaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';




const ListadoDisponibles = () => {


    //instanciar context de empleado
    const empleadoContext = useContext(EmpleadoContext);
    const alertaContext = useContext(AlertaContext);


    //extraer objetos y funciones del state de empleados
    const { empleados, mensaje, obtenerEmpleados } = empleadoContext;
    const { mostrarAlerta } = alertaContext;

    // Obtener los empleados cuando carga el componente
    useEffect(() => {
        // si hay un error
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerEmpleados();
        // eslint-disable-next-line
    }, [mensaje]);


    // revisar si hay empleados registrados
    if (empleados.length === 0) {
        return <p>No hay empleados, comienza creando uno</p>
    }


    return (
        <Fragment>
            <h1>Listado de Empleados</h1>
            <br></br>
            <ul className="listado-tareas">
                <TransitionGroup>
                    {empleados.map(empleado => (
                        <CSSTransition
                            key={empleado._id}
                            timeout={200}
                            className="tarea"
                        >
                            <Disponible

                                empleado={empleado}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>

            </ul>
        </Fragment>);
}

export default ListadoDisponibles;