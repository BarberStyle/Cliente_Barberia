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
    CAMBIAR
} from '../../types';



export default (state, action) => {
    switch (action.type) {
        case FORMULARIO:
            return {
                ...state,
                formulario: true
            }

        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorformulario: true,
                textoAlert: action.payload
            }
        case CAMBIAR:
            return {
                ...state,
                caso: action.payload
            }

        case AGREGAR:
            return {
                ...state,
                clientes: [...state.clientes, action.payload],
                formulario: false,
                errorformulario: false
            }
        case OBTENER:
            return {
                ...state,
                clientes: action.payload
            }
        case ACTUAL:
            return {
                ...state,
                clienteseleccionado: action.payload
            }

        case ELIMINAR:
            return {
                ...state,
                clientes: state.clientes.filter(cliente => cliente._id !== action.payload),
                cliente: null
            }
        case ACTUALIZAR:
            return {
                ...state,
                clientes: state.clientes.map(cliente => cliente._id === action.payload._id ? action.payload : cliente)
            }
        case LIMPIAR:
            return {
                ...state,
                clienteseleccionado: null
            }
        case ERROR:
            return {
                ...state,
                mensaje: action.payload
            }

        default:
            return state;
    }
}