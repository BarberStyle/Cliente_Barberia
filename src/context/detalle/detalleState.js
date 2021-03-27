import React, { useState, useReducer } from 'react';
import clienteAxios from '../../config/axios';
import detalleContext from './detalleContext';
import detalleReducer from './detalleReducer';

import {
    FORMULARIO_PROF,
    LIMPIAR,
    AGREGAR,
    ERROR
} from '../../types';



const DetalleState = props => {

    const initialState = {

        experiencias: [],
        formulario_prof: false

    }


    const [state, dispatch] = useReducer(detalleReducer, initialState);


    // ver formulario registro de empleados
    const mostrarFormularioProfesional = () => {
        dispatch({
            type: FORMULARIO_PROF
        })
    }



    //limpia el empleado seleccionado
    const limpiarDetalle = () => {
        dispatch({
            type: LIMPIAR
        })
    }



    //guardar nueva experiencia con peticion al api
    const agregarExperiencia= async experiencia => {
        try {
            const resultado = await clienteAxios.post('/api/experiencias', experiencia);

            // Insertar el empleado en el state
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
        <detalleContext.Provider
            value={{
                detalle: state.detalles,
                formulario_prof: state.formulario_prof,
                mostrarFormularioProfesional,
                agregarExperiencia,
                limpiarDetalle

            }}
        >
            {props.children}
        </detalleContext.Provider>

    )

}

export default DetalleState; 