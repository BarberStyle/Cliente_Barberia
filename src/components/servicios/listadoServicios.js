import React, { Fragment, useContext, useEffect } from 'react';
import ServicioContext from '../../context/servicios/servicioContext';
import AlertaContext from '../../context/alertas/alertaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import 'bootstrap/dist/css/bootstrap.min.css';
import Servicio from './Servicio';


const ListadoServicios = () => {

    const servicioContext = useContext(ServicioContext);
    const alertaContext = useContext(AlertaContext);
    /** */
    const { servicios, obtenerServicios, mensaje } = servicioContext;
    const {mostrarAlerta } = alertaContext;

    // Obtener proyectos cuando carga el componente
    useEffect(() => {
        // si hay un error
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerServicios();
        // eslint-disable-next-line
    }, [mensaje]);

    // revisar si proyectos tiene contenido
    if (servicios.length === 0) {
        return <p>No hay servicios, comienza creando uno</p>
    } 

    return (
        <Fragment>
            <h1>Listado de Servicios</h1>
            <br></br>
          
            <ul className="listado-tareas">
                <TransitionGroup>
                    {servicios.map(servicio => (
                        <CSSTransition
                            key={servicio._id}
                            timeout={200}
                            className="tarea"
                        >
                            <Servicio

                                servicio={servicio}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>

            </ul>


        </Fragment>
    );
}

export default ListadoServicios;