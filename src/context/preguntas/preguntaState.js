import React, { useState, useReducer } from 'react'
import clienteAxios from '../../config/axios';
import preguntaReducer from './preguntaReducer';
import preguntaContext from './preguntaContext';

import {
    OBTENER,
    ERROR,
    AGREGAR
} from '../../types';


const PreguntaState = props => {

    const initialState = {

        preguntas: [],
        mensaje: null,
        respuestas: [],
        formulario: false,
        errorFormulario: false

    }

    // Dispatch para ejecutar las acciones del reducer
    const [state, dispatch] = useReducer(preguntaReducer, initialState);


    const obtenerPreguntas = async () => {
        try {
            const resultado = await clienteAxios.get('/api/preguntas');
            dispatch({
                type: OBTENER,
                payload: resultado.data.pregunta
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

    // Agregar nueva respuesta
    const agregarRespuesta = async respuesta => {


        try {
            const resultado = await clienteAxios.post('/api/respuestas', respuesta);
            // Insertar la respuesta en el state
            dispatch({
                type: AGREGAR,
                payload: resultado.data
            })
        } catch (error) {
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

    // Obtener los servicios
    const confirmarPregunta = async validacion => {
        try {
            const resultado = await clienteAxios.post('/api/preguntas', validacion);
        } catch (error) {

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
        <preguntaContext.Provider
            value={{
                preguntas: state.preguntas,
                mensaje: state.mensaje,
                obtenerPreguntas,
                agregarRespuesta,
                confirmarPregunta
            }}
        >
            {props.children}
        </preguntaContext.Provider>

    )


}

export default PreguntaState;