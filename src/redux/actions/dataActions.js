import {
    SET_SPORES,
    LOADING_DATA,
    // LIKE_SPORE,
    // UNLIKE_SPORE,
    // DELETE_SPORE,
    // SET_ERRORS,
    // POST_SPORE,
    // CLEAR_ERRORS,
    // LOADING_UI,
    // SET_SPORE,
    // STOP_LOADING_UI,
    // SUBMIT_COMMENT
} from '../types';

import axios from 'axios';

export const getSpores = () => (dispatch) => { 
    dispatch({type: LOADING_DATA});
    axios
        .get('/spores')
        .then(res => {
            dispatch({
                type: SET_SPORES,
                payload: res.data
            });
        })
        .catch(() => {
            dispatch({
                type: SET_SPORES,
                payload: []
            });
        });
};