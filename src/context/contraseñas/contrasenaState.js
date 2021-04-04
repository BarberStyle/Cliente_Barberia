import React, { useReducer } from 'react';
import ContrasenaContext from './contrasenaContext';
import ContrasenaReducer from './contrasenaReducer';

import clienteAxios from '../../config/axios';

import {
    USUARIO_ERROR,
    USUARIO_EXITOSO
} from '../../types';

const ContrasenaState = props => {
    const initialState = {
        errorformulario: false,
        mensaje: null,
        usuarioConfirmado: null


    }

    const [state, dispatch] = useReducer(ContrasenaReducer, initialState);


    const validarRegistro = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/contrasena', datos);
            dispatch({
                type: USUARIO_EXITOSO,
                payload: respuesta.data
            });

        } catch (error) {
            const alerta = {
                msg: error.response?.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: USUARIO_ERROR,
                payload: alerta
            })
        }
    }


    return (
        <ContrasenaContext.Provider
            value={{
                mensaje: state.mensaje,
                errorformulario: state.errorformulario,
                usuarioConfirmado: state.usuarioConfirmado,
                validarRegistro
            }}
        >{props.children}

        </ContrasenaContext.Provider>
    )
}
export default ContrasenaState;
