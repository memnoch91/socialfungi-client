/* eslint-disable default-case */
import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, LIKE_SPORE, UNLIKE_SPORE } from '../types';
// SET_ERRORS, CLEAR_ERRORS, LOADING_UI


const initialSate = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: []
}

export default function (state = initialSate, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };

        case SET_UNAUTHENTICATED:
            return initialSate;

        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case LOADING_USER: 
            return {
                ...state,
                loading: true
            };
        case LIKE_SPORE: 
            console.log(action.payload);
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        sporeId: action.payload.sporeId
                    }
                ]
            };
        case UNLIKE_SPORE:
            console.log(action.payload);
            return {
                ...state,
                likes: state.likes.filter(like => like.sporeId !== action.payload.sporeId)
            };
        default:
            return state;
    }
}