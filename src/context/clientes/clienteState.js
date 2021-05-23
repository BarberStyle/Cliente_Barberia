import React, { useReducer } from 'react'
import clienteAxios from '../../config/axios';
import clienteReducer from './clienteReducer';
import clienteContext from './clienteContext';

import {
    VALIDAR_FORMULARIO,
    ERROR,
    OBTENER,
    ACTUAL,
    LIMPIAR,
    ACTUALIZAR
} from '../../types';


const ClienteState = props => {

    const initialState = {

        clientes: [],
        formulario: false,
        errorformulario: false,
        empleado: null,
        mensaje: null,
        clienteSeleccionado: null,
        textoAlert:''
    }

    // Dispatch para ejecutar las acciones del reducer
    const [state, dispatch] = useReducer(clienteReducer, initialState);


    // Valida el formulario por errores
    const mostrarError = alert => {
        dispatch({
            type: VALIDAR_FORMULARIO,
            payload: alert
        })
    }


    // Obtener los clientes
    const obtenerClientes = async () => {
        try {
            const resultado = await clienteAxios.get('/api/usuarios');
            dispatch({
                type: OBTENER,
                payload: resultado.data.usuarios
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
            }

            dispatch({
                type: ERROR,
                payload: alerta
            })
        }
    }

    // Guarda el empleado que el usuario dio click para editar
    const guardarClienteSeleccionado = empleado => {
        dispatch({
            type: ACTUAL,
            payload: empleado
        })
    }


    //limpia el empleado seleccionado
    const limpiarCliente = () => {
        dispatch({
            type: LIMPIAR
        })
    }


    // Edita o modifica un servicio
    const actualizarEmpleado = async empleado => {

        try {
            const resultado = await clienteAxios.put(`/api/clientes/${empleado._id}`, empleado);
            dispatch({
                type: ACTUALIZAR,
                payload: resultado.data.empleado
            })
        } catch (error) {
        }
    }


    return (
        <clienteContext.Provider
            value={{
                clientes: state.clientes,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                clienteSeleccionado: state.clienteSeleccionado,
                mensaje: state.mensaje,
                mostrarError,
                obtenerClientes,
                guardarClienteSeleccionado,
                limpiarCliente,
                actualizarEmpleado
            }}
        >
            {props.children}
        </clienteContext.Provider>

    )


}

export default ClienteState;