import React, { useState, useReducer } from 'react'
import clienteAxios from '../../config/axios';
import estudioReducer from './estudioReducer';
import estudioContext from './estudioContext';

import {
    AGREGAR,
    ERROR
} from '../../types';




const EstudioState = props => {

    const initialState = {

        estudios: []
    }

    // Dispatch para ejecutar las acciones del reducer
    const [state, dispatch] = useReducer(estudioReducer, initialState);


    const agregarEstudio = async estudio => {
        try {
            const resultado = await clienteAxios.post('/api/estudios', estudio);


            // Insertar el estudio en el state
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
        <estudioContext.Provider
            value={{
                estudios: state.estudios,
                agregarEstudio

            }}
        >
            {props.children}
        </estudioContext.Provider>

    )


}

export default EstudioState;