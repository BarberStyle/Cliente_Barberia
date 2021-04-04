import React, {  useReducer } from 'react'
import citaContext from './citaContext';
import citaReducer from './citaReducer';
import clienteAxios from '../../config/axios';



import {
    FORMULARIO,
    DISPONIBLE,
    DIAS,
    ERROR
} from '../../types';



const CitaState = props => {

    const initialState = {

        citas: [],
        formulario: null,
        empleadoDisponible: null,
        diasTrabajados: []
    }

    // Dispatch para ejecutar las acciones del reducer
    const [state, dispatch] = useReducer(citaReducer, initialState);

    // mostrar formulario de la nueva cita
    const mostrarCita = () => {
        dispatch({
            type: FORMULARIO
        })
    }

    // Guarda el empleado que esta disponible para agendamiento
    const guardarEmpleadoDisponible = empleado => {
        dispatch({
            type: DISPONIBLE,
            payload: empleado
        })
    }

    //consulta los dias de trabajo de los empleados
    const consultarDias = async () => {

        try {
            const resultado = await clienteAxios.get('/api/dias');
            dispatch({
                type: DIAS,
                payload: resultado.data.dias
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: ERROR,
                payload: alerta
            })
        }
    }



    return (
        <citaContext.Provider
            value={{
                citas: state.citas,
                formulario: state.formulario,
                empleadoDisponible: state.empleadoDisponible,
                diasTrabajados: state.diasTrabajados,
                guardarEmpleadoDisponible,
                mostrarCita,
                consultarDias
            }}
        >
            {props.children}
        </citaContext.Provider>

    )


}


export default CitaState;

