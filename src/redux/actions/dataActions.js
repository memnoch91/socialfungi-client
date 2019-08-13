import {
    SET_SPORES,
    LOADING_DATA,
    LIKE_SPORE,
    UNLIKE_SPORE,
    DELETE_SPORE,
    LOADING_UI,
    POST_SPORE,
    // DELETE_SPORE,
    SET_ERRORS,
    // POST_SPORE,
    CLEAR_ERRORS,
    SET_SPORE,
    STOP_LOADING_UI,
    // SUBMIT_COMMENT,
} from '../types';

import axios from 'axios';

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

export const getSpore = (sporeId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .get(`/spore/${sporeId}`)
        .then(res => {
            dispatch({
                type: SET_SPORE,
                payload: res.data
            });
        })
        .then(() => {
            dispatch({
                type: STOP_LOADING_UI
            })
        })
        .catch(err => console.error('getSpore', err))

}

//get all spores
export const getSpores = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
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

export const likeSpore = (sporeId) => (dispatch) => {
    axios
        .get(`spore/${sporeId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_SPORE,
                payload: res.data
            });
        })
        .catch(err => console.error(err));
}
export const unlikeSpore = (sporeId) => (dispatch) => {
    axios
        .get(`spore/${sporeId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_SPORE,
                payload: res.data
            });
        })
        .catch(err => console.error(err));
}

export const deleteSpore = (sporeId) => (dispatch) => {
    axios
        .delete(`spore/${sporeId}`)
        .then(res => {
            dispatch({
                type: DELETE_SPORE,
                payload: sporeId
            })
        })
        .catch(err => console.error(err))
}

export const postSpore = (newSpore) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post(`/spore`, newSpore)
        .then(res => {
            dispatch({
                type: POST_SPORE,
                payload: res.data
            });
            dispatch(clearErrors())
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })

}


