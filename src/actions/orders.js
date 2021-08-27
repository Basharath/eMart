import {
  GET_ORDERS,
  GET_ORDER,
  POST_ORDER,
  CANCEL_ORDER,
  ORDER_ERROR,
  START_LOADING,
  STOP_LOADING,
} from '../actionTypes';
import * as api from '../api';

export const getOrders = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getOrders();
    dispatch({ type: GET_ORDERS, payload: data });
    dispatch({ type: STOP_LOADING });
  } catch (err) {
    const data = err.response ? err.response.data : 'Something went wrong';
    dispatch({ type: ORDER_ERROR, payload: data });
    console.log('Orders Err', err);
  }
};

export const getOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getOrder(orderId);
    dispatch({ type: GET_ORDER, payload: data });
    dispatch({ type: STOP_LOADING });
  } catch (err) {
    const data = err.response ? err.response.data : 'Something went wrong';
    dispatch({ type: ORDER_ERROR, payload: data });
    console.log('Orders Err', err);
  }
};

export const postOrder = (orderData) => async (dispatch) => {
  try {
    const { data } = await api.postOrder(orderData);
    dispatch({ type: POST_ORDER, payload: data });
  } catch (err) {
    console.log('Orders Err', err);
  }
};

export const cancelOrder = (orderId) => async (dispatch) => {
  try {
    const { data } = await api.cancelOrder(orderId);
    dispatch({ type: CANCEL_ORDER, payload: data });
  } catch (err) {
    const data = err.response ? err.response.data : 'Something went wrong';
    dispatch({ type: ORDER_ERROR, payload: data });
    console.log('Orders Err', err);
  }
};
