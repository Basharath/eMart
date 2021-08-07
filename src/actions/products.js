import * as api from '../api';
import {
  GET_PRODUCTS,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  RATE_PRODUCT,
} from '../actionTypes';

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await api.getProducts();
    dispatch({ type: GET_PRODUCTS, payload: data });
  } catch (err) {
    console.log('Error', err.message);
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    const { data } = await api.getProduct(id);
    dispatch({ type: GET_PRODUCT, payload: data });
  } catch (err) {
    console.log(err.message);
  }
};

export const updateProduct = (id, product) => async (dispatch) => {
  try {
    const { data } = await api.updateProduct(id, product);
    dispatch({ type: UPDATE_PRODUCT, payload: data });
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteProduct(id);
    dispatch({ type: DELETE_PRODUCT, payload: data._id });
  } catch (err) {
    console.log(err.message);
  }
};

export const rateProduct = (id, rating) => async (dispatch) => {
  try {
    const { data } = await api.rateProduct(id, rating);
    dispatch({ type: RATE_PRODUCT, payload: data });
  } catch (err) {
    console.log(err.message);
  }
};
