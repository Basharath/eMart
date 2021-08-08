import jwtDecode from 'jwt-decode';
import * as api from '../api';
import { AUTH, LOGOUT, GET_USER } from '../actionTypes';

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

export const getUser = () => (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem('token-emart'));
    const userData = token && jwtDecode(token);

    dispatch({ type: GET_USER, payload: userData });
  } catch (err) {
    console.log(err.message);
  }
};

export const logout = () => ({ type: LOGOUT });
