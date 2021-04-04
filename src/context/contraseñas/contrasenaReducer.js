import {
    USUARIO_ERROR,
    USUARIO_EXITOSO
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case USUARIO_EXITOSO:
            return {
                ...state,
                usuarioConfirmado: action.payload,
            }
        case USUARIO_ERROR:
            return {
                ...state,
                mensaje: action.payload,
            }

        default:
            return state;
    }
}