import React, { useReducer } from 'react'
import clienteAxios from '../../config/axios';
import citaContext from './citaContext';
import citaReducer from './citaReducer';

import {
    ACTUALIZAR,
    OBTENER,
    ERROR,
    ELIMINAR,
    OBTENER_PUNTOS
} from '../../types';

const CitaState = props => {

    const initialState = {
        citas: [],
        puntos:[]

    }

    const [state, dispatch] = useReducer(citaReducer, initialState);

    // Obtener las citas
    const obtenerCitas = async () => {
        try {
            const resultado = await clienteAxios.get('/api/citas');
            dispatch({
                type: OBTENER,
                payload: resultado.data.citas
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

    const eliminacionCita = async idCita => {
        // Elimina una cita
        try {
            await clienteAxios.delete(`/api/citas/${idCita}`);
            dispatch({
                type: ELIMINAR,
                payload: idCita
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

    const actualizarCita = async cita => {
        try {
            const resultado = await clienteAxios.put(`/api/citas/${cita._id}`, cita);
            dispatch({
                type: ACTUALIZAR,
                payload: resultado.data.cita
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

    // Obtener las citas
    const obtenerCitasEmpleado = async () => {
        try {
            const resultado = await clienteAxios.get('/api/citas');
            dispatch({
                type: OBTENER,
                payload: resultado.data.citas
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

    const liberacionPuntos = async cita => {
        let calculo = (5 / 100) * cita.costo;

        let puntos = ({
            docCliente: cita.docCliente,
            cantidad: calculo,
            estado: 'Activo'
        });

        console.log(puntos);
        try {
            const resultado = await clienteAxios.post('/api/puntos', puntos);
            // Insertar los puntos
            // dispatch({
            //     type: AGREGAR,
            //     payload: resultado.data
            // })
        } catch (error) {
            // console.log(error);
            // const alerta = {
            //     msg: error.response?.data.msg,
            // }

            // dispatch({
            //     type: REGISTRO_ERROR,
            //     payload: alerta
            // })
        }

    }

      // Obtener las citas
      const obtenerPuntaje = async () => {
        try {
            const resultado = await clienteAxios.get('/api/puntos');
            dispatch({
                type: OBTENER_PUNTOS,
                payload: resultado.data.puntos
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
                puntos: state.puntos,
                obtenerCitas,
                eliminacionCita,
                actualizarCita,
                obtenerCitasEmpleado,
                liberacionPuntos,
                obtenerPuntaje
            }}
        >
            {props.children}
        </citaContext.Provider>

    )


}

export default CitaState;