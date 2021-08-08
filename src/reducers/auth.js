import { AUTH, LOGOUT, GET_USER } from '../actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('token-emart', JSON.stringify(action.payload.token));
      return { ...state, authData: action.payload };

    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };

    case GET_USER:
      return { ...state, authData: action.payload };

    default:
      return state;
  }
};

export default authReducer;
