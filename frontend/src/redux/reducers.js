import { AUTH_STATE } from './actionTypes';

const initialState = {
  authState: [],
};

const headerReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_STATE:
      return {
        ...state,
        authState: [...state.authState, action.payload],
      };
      default:
        return state;
  }
};

export default headerReducer;
