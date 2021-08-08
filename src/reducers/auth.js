import { AUTH, LOGOUT } from '../actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('token-emart', JSON.stringify(action.payload.token));
      return { ...state, authData: action.payload };

    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };

    default:
      return state;
  }
};

export default authReducer;
