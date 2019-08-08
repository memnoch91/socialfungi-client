import {
    SET_SPORES,
    LOADING_DATA,
    LIKE_SPORE,
    UNLIKE_SPORE,
    DELETE_SPORE,
    POST_SPORE,
    SET_SPORE,
    SUBMIT_COMMENT
} from '../types';

const initialSate = {
    spores: [],
    spore: [],
    loading: false
}

export default function (state = initialSate, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case SET_SPORES:
            return {
                ...state,
                spores: action.payload,
                loading: false
            };
        case SET_SPORE:
            return {
                ...state,
                spore: action.payload
            }
        case LIKE_SPORE:
        case UNLIKE_SPORE:
            const index = state.spores.findIndex(
                spore => spore.sporeId === action.payload.sopreId
            );
            state.spores[index] = action.payload;
            if (state.spore.sporeId === action.payload.sopreId) {
                state.spore = action.payload;
            }
            return {
                ...state
            }

        default:
            return state;
    }

}
