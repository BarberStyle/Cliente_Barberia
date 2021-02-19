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

export default (state, action) => {
    switch (action.type) {
        case FORMULARIO:
            return {
                ...state,
                formulario: true
            }
        case OBTENER:
            return {
                ...state,
                servicios: action.payload
            }
        case AGREGAR:
            return {
                ...state,
                servicios: [...state.servicios, action.payload],
                formulario: false,
                errorformulario: false
            }
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorformulario: true
            }
        case ACTUAL:
            return {
                ...state,
                servicioSeleccionado: action.payload
            }
        case ELIMINAR:
            return {
                ...state,
                servicios: state.servicios.filter(servicio => servicio._id !== action.payload),
                servicio: null
            }
        case ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        case ACTUALIZAR:
            return {
                ...state,
                servicios: state.servicios.map(servicio => servicio._id === action.payload._id ? action.payload : servicio)
            }

        case LIMPIAR:
            return {
                ...state,
                servicioSeleccionado: null
            }
        default:
            return state;
    }
}