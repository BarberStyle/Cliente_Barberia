import React, { useReducer } from 'react';
import reporteContext from './reporteContext';
import reporteReducer from './reporteReducer';

import {
    ABRIR_MODAL,
    AGREGAR,
    ERROR,
    LIMPIAR,
    CERRAR_MODAL
} from '../../types';

import clienteAxios from '../../config/axios';


const ReporteState = props => {

    const initialState = {
        citas: [],
        errorformulario: false,
        mensaje: null,
        abrirModalGanancias: false,
        mensajeConfirmación: ''

    }
    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(reporteReducer, initialState);


    // Serie de funciones para el CRUD
    const generarReporte = async rango => {
        try {
            const resultado = await clienteAxios.post('/api/reportes', rango);
            dispatch({
                type: AGREGAR,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg: error.response?.data.msg
            }
            dispatch({
                type: ERROR,
                payload: alerta
            })
        }
    }

    const mostrarModalGanancias = () => {
        dispatch({
            type: ABRIR_MODAL
        })

    }

    const cerrarModalGanancias = negativo => {
        dispatch({
            type: CERRAR_MODAL,
            payload: negativo
        })
    }

    const limpiarReporte = () => {
        dispatch({
            type: LIMPIAR
        })
    }


    return (
        <reporteContext.Provider
            value={{
                citas: state.citas,
                abrirModalGanancias: state.abrirModalGanancias,
                mensaje: state.mensaje,
                generarReporte,
                mostrarModalGanancias,
                cerrarModalGanancias,
                limpiarReporte
            }}
        >
            {props.children}
        </reporteContext.Provider>

    )
}
export default ReporteState;