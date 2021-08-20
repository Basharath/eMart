import { AUTH, LOGOUT, AUTH_ERROR } from '../actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('token-emart', JSON.stringify(action.payload.token));
      return { ...state, authData: action?.payload, error: null };

    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, error: null };

    case AUTH_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default authReducer;
