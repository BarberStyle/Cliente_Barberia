import {
    DISPONIBLE,
    FORMULARIO,
    DIAS
} from '../../types';



export default (state, action) => {
    switch (action.type) {

        case FORMULARIO:
            return {
                ...state,
                formulario: true
            }
        case DISPONIBLE:
            return {
                ...state,
                empleadoDisponible: action.payload
            }
        case DIAS:
            return {
                ...state,
                diasTrabajados: action.payload
            }

        default:
            return state;
    }
}