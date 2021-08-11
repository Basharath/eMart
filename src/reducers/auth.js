import { AUTH, LOGOUT, GET_USER, AUTH_ERROR } from '../actionTypes';

const authReducer = (state = { authData: null, userData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('token-emart', JSON.stringify(action.payload.token));
      return { ...state, authData: action.payload };

    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, userData: null };

    case GET_USER:
      return { ...state, userData: action.payload };

    case AUTH_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default authReducer;
