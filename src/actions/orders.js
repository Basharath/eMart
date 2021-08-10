import { GET_ORDERS, POST_ORDER, CANCEL_ORDER } from '../actionTypes';
import * as api from '../api';

export const getOrders = () => async (dispatch) => {
  try {
    const { data } = await api.getOrders();
    dispatch({ type: GET_ORDERS, payload: data });
  } catch (err) {
    console.log('Orders Err', err.response.data);
  }
};

export const postOrder = (orderData) => async (dispatch) => {
  try {
    const { data } = await api.postOrder(orderData);
    dispatch({ type: POST_ORDER, payload: data });
  } catch (err) {
    console.log('Orders Err', err.response.data);
  }
};

export const cancelOrder = (orderId) => async (dispatch) => {
  try {
    const { data } = await api.cancelOrder(orderId);
    dispatch({ type: CANCEL_ORDER, payload: data });
  } catch (err) {
    console.log('Orders Err', err.response.data);
  }
};
