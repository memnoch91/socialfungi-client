import {
    SET_SPORES,
    LOADING_DATA,
    LIKE_SPORE,
    UNLIKE_SPORE,
    DELETE_SPORE,
    POST_SPORE,
    SET_SPORE,
    POST_COMMENT
} from '../types';

const initialSate = {
    spores: [],
    spore: {},
    loading: false
}

let index;

export default function (state = initialSate, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case POST_SPORE:
            return {
                ...state,
                spores:[action.payload, ...state.spores]
            }
        case POST_COMMENT: 
            return {
                ...state,
                spore: {
                    ...state.spore,
                    comments: [action.payload, ...state.spore.comments]
                }
            }
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
            index = state.spores.findIndex(
                spore => spore.sporeId === action.payload.sporeId
            );
            let tempSpore = {...state.spore}
            state.spores[index] = action.payload;
            if (tempSpore.sporeId === action.payload.sporeId) {
                tempSpore = action.payload;
            }
            return {
                ...state,
                spore: {
                    ...tempSpore,
                    comments: [...state.spore.comments]
                }
            }
        case DELETE_SPORE:
            let newArray = [...state.spores]
            index = newArray.findIndex(
                spore => spore.sporeId === action.payload
            )
            newArray.splice(index, 1)
            return {
                ...state,
                spores: newArray
            }
        default:
            return state;
    }

}
