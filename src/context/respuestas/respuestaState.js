import React, { useReducer } from 'react'
import clienteAxios from '../../config/axios';
import respuestaReducer from './respuestaReducer';
import respuestaContext from './respuestaContext';

import {
    AGREGAR,
    ERROR
} from '../../types';




const RespuestaState = props => {

    const initialState = {

        respuestas: [],
        mensaje: null

    }

    // Dispatch para ejecutar las acciones del reducer
    const [state, dispatch] = useReducer(respuestaReducer, initialState);


    const agregarRespuesta = async respuesta => {
        try {
            const resultado = await clienteAxios.post('/api/respuestas', respuesta);


            // Insertar el respuesta en el state
            dispatch({
                type: AGREGAR,
                payload: resultado.data
            })
        } catch (error) {
            console.log(error);
            const alerta = {
                msg: error.response?.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: ERROR,
                payload: alerta
            })
        }

    }

    return (
        <respuestaContext.Provider
            value={{
                respuestas: state.respuestas,
                mensaje: state.mensaje,
                agregarRespuesta

            }}
        >
            {props.children}
        </respuestaContext.Provider>

    )

}

export default RespuestaState;