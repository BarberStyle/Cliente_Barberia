import React, { useReducer } from 'react';
import reporteContext from './reporteContext';
import reporteReducer from './reporteReducer';

import {
    ABRIR_MODAL,
    AGREGAR,
    ERROR,
    VALIDAR_FORMULARIO,
    ACTUAL,
    ELIMINAR,
    ACTUALIZAR,
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

    // Agregar nuevo proyecto
    const generarReporte = async rango => {

        try {
            const resultado = await clienteAxios.post('/api/reportes', rango);
            console.log(resultado);
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

    const mostrarModalGanancias = () => {
        dispatch({
            type: ABRIR_MODAL,
        })

    }

    const cerrarModalGanancias = () => {
        dispatch({
            type: CERRAR_MODAL,
        })
    }

    // Valida el formulario por errores
    const mostrarError = alert => {
        dispatch({
            type: VALIDAR_FORMULARIO,
            payload: alert
        })
    }

    const guardarreporteSeccionado = reporte => {
        dispatch({
            type: ACTUAL,
            payload: reporte
        })
    }

    // Elimina un reporte
    const eliminarreporte = async reporteId => {
        try {
            await clienteAxios.delete(`/api/reportes/${reporteId}`);
            dispatch({
                type: ELIMINAR,
                payload: reporteId
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

    // Edita o modifica un reporte
    const actualizarProducto = async producto => {

        try {
            const resultado = await clienteAxios.put(`/api/productos/${producto._id}`, producto);
            dispatch({
                type: ACTUALIZAR,
                payload: resultado.data.producto
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

    // Elimina el producto seleccionado
    const limpiarProducto = () => {
        dispatch({
            type: LIMPIAR
        })
    }


    return (
        <reporteContext.Provider
            value={{
                citas: state.citas,
                abrirModalGanancias: state.abrirModalGanancias,
                mensajeConfirmación: state.mensajeConfirmación,
                generarReporte,
                mostrarModalGanancias,
                cerrarModalGanancias
            }}
        >
            {props.children}
        </reporteContext.Provider>

    )
}
export default ReporteState;