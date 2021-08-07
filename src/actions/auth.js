import * as api from '../api';
import { AUTH, LOGOUT } from '../actionTypes';

export const login = (userData, router) => async (dispatch) => {
  try {
    const { data } = await api.signInUser(userData);

    dispatch({ type: AUTH, payload: data });
    router.push('/');
  } catch (err) {
    console.log(err.message);
  }
};

export const signup = (userData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUpUser(userData);

    dispatch({ type: AUTH, payload: data });
    router.push('/');
  } catch (err) {
    console.log(err.message);
  }
};

export const logout = () => ({ type: LOGOUT });
