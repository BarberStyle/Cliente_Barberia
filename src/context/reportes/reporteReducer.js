import {
    CERRAR_MODAL,
    OBTENER,
    AGREGAR,
    ERROR,
    VALIDAR_FORMULARIO,
    ACTUAL,
    ELIMINAR,
    ACTUALIZAR,
    LIMPIAR,
    ABRIR_MODAL
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case ABRIR_MODAL:
            return {
                ...state,
                abrirModalGanancias: true
            }
        case CERRAR_MODAL:
            return {
                ...state,
                abrirModalGanancias: false,
                citas: []
            }
        case AGREGAR:
            return {
                ...state,
                citas: action.payload,
                formulario: false,
                errorformulario: false,
                mensajeConfirmación: 'Datos Encontrados'
            }
    
        default:
            return state;
    }
}