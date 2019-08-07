/* eslint-disable default-case */
import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../types';
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
                ...action.payload
            };

        default:
            return state;
    }
}