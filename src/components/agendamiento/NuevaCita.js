import React, { Fragment, useContext, useEffect, useState } from 'react';
import CitaContext from '../../context/citas/citaContext';
import ServicioContext from '../../context/servicios/servicioContext';



const NuevaCita = () => {

    const citaContext = useContext(CitaContext);
    const servicioContext = useContext(ServicioContext);

    const { formulario, empleadoDisponible, consultarDias, diasTrabajados } = citaContext;

    const { servicios,obtenerServicios } = servicioContext;

    // Effect que detecta si hay un empleado seleccionado

    useEffect(() => {
        if (empleadoDisponible !== null) {

            consultarDias();
            obtenerServicios();


        } else {

            guardarCita({
                idEmpleado: '',
                nombresEmpleado: '',
                apellidosEmpleado: '',
                hora: '',
                idUsuario: ''
            })
        }

    }, [empleadoDisponible]);



    //State para guardar los datos de la cita
    const [cita, guardarCita] = useState({
        idEmpleado: '',
        nombresEmpleado: '',
        apellidosEmpleado: '',
        hora: '',
        idUsuario: ''
    });

    const [diaSeleccionado, guardarDiaSeleccionado] = useState({
        id: '',
        nombre: ''

    });

    return (
        <Fragment>
            {formulario ?
                (
                    <form
                        className="formulario-nuevo-proyecto"
                    >
                        <h2>Cita</h2>

                        <div className="campo-form">
                            <label htmlFor="dispo">Dia</label>
                            <select
                                type="text"
                                id="hora"
                                name="hora"
                                className="input-text"
                                placeholder="--Seleccione--"
                            > {diasTrabajados.map(dia => (
                                <option>{dia.nombre}</option>
                            ))}
                            </select>
                        </div>

                        <div className="campo-form">
                            <label htmlFor="dispo">Servicios</label>
                            <select
                                type="text"
                                id="servicios"
                                name="servicios"
                                className="input-text"
                                placeholder="--Seleccione--"
                            >
                               {servicios.map(servicio =>(
                                    <option>{servicio.nombre}</option>
                               ))}
                            </select>
                        </div>


                        <div className="campo-form">
                            <label htmlFor="dispo">Hora</label>
                            <select
                                type="text"
                                id="hora"
                                name="hora"
                                className="input-text"
                                placeholder="--Seleccione--"
                            >
                                <option>--Seleccione--</option>
                            </select>
                        </div>



                        <input
                            type="submit"
                            className="btn btn-primary btn-block"
                            value="Agendar"
                        />
                    </form>
                ) : null}


        </Fragment>
    )


}

export default NuevaCita;