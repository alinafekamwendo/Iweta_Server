import { AUTH_STATE } from './actionTypes';

export const authState = (header) => {
    return (dispatch) => {
        dispatch({
            type: AUTH_STATE,
            payload: header,
        });
    };
};
