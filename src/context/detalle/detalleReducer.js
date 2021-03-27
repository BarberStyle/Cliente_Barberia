import {

    FORMULARIO_PROF,
    LIMPIAR,
    AGREGAR
} from '../../types';



export default (state, action) => {
    switch (action.type) {
        case FORMULARIO_PROF:
            return {
                ...state,
                formulario_prof: true
            }
        case AGREGAR:
            return {
                ...state,
                experiencias: [...state.experiencias, action.payload],
            }
        case LIMPIAR:
            return {
                ...state,
                formulario_prof: false
            }
        default:
            return state;
    }
}