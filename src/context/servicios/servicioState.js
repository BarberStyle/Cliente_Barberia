import React, { useReducer, useState } from 'react';
import servicioContext from './servicioContext';
import servicioReducer from './servicioReducer';

import {
    FORMULARIO,
    OBTENER,
    AGREGAR,
    ERROR,
    VALIDAR_FORMULARIO,
    ACTUAL,
    ELIMINAR,
    ACTUALIZAR,
    LIMPIAR
} from '../../types';

import clienteAxios from '../../config/axios';


const ServicioState = props => {

    const initialState = {
        servicios: [],
        formulario: false,
        errorformulario: false,
        servicio: null,
        mensaje: null,
        servicioSeleccionado: null
    }
    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(servicioReducer, initialState);

    const [editServicio, guardarServicio] = useState({
        nombre: '',
        precio: '',
        imagen: '',
        duracion: '',
        tipo: ''
    })
    /*
        const [pregunta, guardarPregunta] = useState({
            id: '',
            respuesta: ''
        })
    */
    // Serie de funciones para el CRUD

    // Obtener los servicios
    const obtenerServicios = async () => {
        try {
            const resultado = await clienteAxios.get('/api/servicios');
            dispatch({
                type: OBTENER,
                payload: resultado.data.servicios
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

    // Agregar nuevo proyecto
    const agregarServicio = async servicio => {

        try {
            const resultado = await clienteAxios.post('/api/servicios', servicio);

            // Insertar el servicio en el state
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

    // Valida el formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    // Selecciona el Proyecto que el usuario dio click
    const guardarServicioSeccionado = servicio => {
        dispatch({
            type: ACTUAL,
            payload: servicio
        })
    }

    // Elimina un servicio
    const eliminarServicio = async servicioId => {
        try {
            await clienteAxios.delete(`/api/servicios/${servicioId}`);
            dispatch({
                type: ELIMINAR,
                payload: servicioId
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

    // Edita o modifica un servicio
    const actualizarServicio = async servicio => {

        try {
            const resultado = await clienteAxios.put(`/api/servicios/${servicio._id}`, servicio);
            dispatch({
                type: ACTUALIZAR,
                payload: resultado.data.servicio
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

    // Elimina el servicio seleccionado
    const limpiarServicio = () => {
        dispatch({
            type: LIMPIAR
        })
    }

    // ver formulario registro de servicios
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO
        })
    }


    return (
        <servicioContext.Provider
            value={{
                servicios: state.servicios,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                servicio: state.servicio,
                servicioSeleccionado: state.servicioSeleccionado,
                mensaje: state.mensaje,
                editServicio: editServicio,
                obtenerServicios,
                agregarServicio,
                mostrarError,
                eliminarServicio,
                guardarServicio,
                actualizarServicio,
                guardarServicioSeccionado,
                limpiarServicio,
                mostrarFormulario
                // guardarPregunta
            }}
        >
            {props.children}
        </servicioContext.Provider>

    )
}
export default ServicioState;