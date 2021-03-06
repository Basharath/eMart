import * as api from '../api';
import {
  GET_CART,
  UPDATE_CART,
  CLEAR_CART,
  START_LOADING,
  STOP_LOADING,
} from '../actionTypes';

export const getCart = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getCart();

    dispatch({ type: GET_CART, payload: data.items });
    dispatch({ type: STOP_LOADING });
  } catch (err) {
    dispatch({ type: STOP_LOADING });
    // console.log('Cart err', err.response.data);
  }
};

export const updateCart = (item) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updateCart(item);

    dispatch({ type: UPDATE_CART, payload: data.items });
    dispatch({ type: STOP_LOADING });
  } catch (err) {
    dispatch({ type: STOP_LOADING });
    console.log('Cart err', err.response.data);
  }
};

export const clearCart = () => async (dispatch) => {
  try {
    await api.clearCart();

    dispatch({ type: CLEAR_CART });
  } catch (err) {
    dispatch({ type: STOP_LOADING });
    console.log('Cart err', err.response.data);
  }
};

export const checkoutCart = async (products) => {
  try {
    const { data } = await api.checkoutCart(products);

    return data;
  } catch (err) {
    console.log('Cart err', err.message);
  }
};
