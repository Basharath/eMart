import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import * as api from '../api';
import {
  AUTH,
  LOGOUT,
  AUTH_ERROR,
  START_LOADING,
  STOP_LOADING,
  RESET_AUTH_ERROR,
} from '../actionTypes';

export const login = (userData, location, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.signInUser(userData);
    dispatch({ type: AUTH, payload: data });

    dispatch({ type: STOP_LOADING });
    const { state } = location;
    // window.location = state ? state.from.pathname : '/';
    history.push(state ? state.from.pathname : '/');
  } catch (err) {
    const data = err.response ? err.response.data : 'Something went wrong';
    dispatch({ type: AUTH_ERROR, payload: data });
    dispatch({ type: STOP_LOADING });
  }
};

export const signup = (userData, location, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.signUpUser(userData);
    dispatch({ type: AUTH, payload: data });

    dispatch({ type: STOP_LOADING });
    const { state } = location;
    history.push(state ? state.from.pathname : '/');
  } catch (err) {
    const data = err.response ? err.response.data : 'Something went wrong';
    dispatch({ type: AUTH_ERROR, payload: data });
    dispatch({ type: STOP_LOADING });
  }
};

export const getUser = () => {
  try {
    const token = JSON.parse(localStorage.getItem('token-emart'));
    let userData = token && jwtDecode(token);
    if (userData) {
      userData =
        Math.floor(new Date().getTime() / 1000) > userData.exp
          ? null
          : userData;
    }
    return userData;
    // dispatch({ type: GET_USER, payload: userData });
  } catch (err) {
    console.log(err.message);
  }
  return 0;
};

export const getAuth = () => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem('token-emart'));

    dispatch({ type: AUTH, payload: { token } });
  } catch (err) {
    console.log(err.message);
  }
};

export const changePassword = async (passwordData) => {
  try {
    const { data } = await api.changePassword(passwordData);
    return data;
  } catch (err) {
    const data = err.response ? err.response.data : 'Something went wrong';
    toast.error(data);
  }
};

export const resetAuthError = () => ({ type: RESET_AUTH_ERROR });

export const logout = () => ({ type: LOGOUT });
