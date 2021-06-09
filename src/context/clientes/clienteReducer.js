import {
    FORMULARIO,
    VALIDAR_FORMULARIO,
    AGREGAR,
    ERROR,
    OBTENER,
    ELIMINAR,
    ACTUAL,
    LIMPIAR,
    ACTUALIZAR,
    CAMBIAR,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LIMPIAR_STATE
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case REGISTRO_EXITOSO:
            return {
                ...state,
                mensaje: null,
                cargando: false,
                errorformulario: false,
                mensajeConfirmación:  action.payload
            }
        case FORMULARIO:
            return {
                ...state,
                formulario: true
            }

        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorformulario: true,
                mensaje: action.payload
            }

        case OBTENER:
            return {
                ...state,
                clientes: action.payload
            }

        case ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        case REGISTRO_ERROR:
            return {
                errorformulario: true,
                mensaje: action.payload
            }
        case LIMPIAR_STATE:
            return {
                errorformulario: false,
                mensaje: null
            }

        default:
            return state;
    }
}