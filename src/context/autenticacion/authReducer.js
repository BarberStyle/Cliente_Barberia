import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
    VALIDAR_FORMULARIO
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false,
                errorformulario: false
            }
        case REGISTRO_EXITOSO:
            return {
                ...state,
                mensaje: null,
                cargando: false,
                errorformulario: false
            }
        case OBTENER_USUARIO:
            return {
                ...state,
                autenticado: true,
                usuario: action.payload,
                cargando: false
            }
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorformulario: true
            }
        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                usuario: null,
                autenticado: false,
                mensaje: action.payload,
                cargando: false
            }

        default:
            return state;
    }
}