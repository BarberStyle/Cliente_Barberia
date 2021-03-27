import {

    OBTENER,
    ERROR,
    AGREGAR

} from '../../types';



export default (state, action) => {
    switch (action.type) {

        case OBTENER:
            return {
                ...state,
                preguntas: action.payload
            }
        case AGREGAR:
            return {
                ...state,
                respuestas: [...state.respuestas, action.payload],
                formulario: false,
                errorformulario: false
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