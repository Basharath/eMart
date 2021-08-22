import * as api from '../api';
import {
  GET_PRODUCTS,
  GET_VENDOR_PRODS,
  GET_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  RATE_PRODUCT,
  START_LOADING,
  STOP_LOADING,
  PRODUCT_ERROR,
  RESET_PROD_ERROR,
} from '../actionTypes';

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getProducts();
    dispatch({ type: GET_PRODUCTS, payload: data });
    dispatch({ type: STOP_LOADING });
  } catch (err) {
    console.log('Error', err.message);
  }
};

export const getVendorProducts = (id) => async (dispatch) => {
  try {
    const { data } = await api.getProducts(id);
    dispatch({ type: GET_VENDOR_PRODS, payload: data });
  } catch (err) {
    console.log('Error', err.message);
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    const { data } = await api.getProduct(id);
    dispatch({ type: GET_PRODUCT, payload: data });
  } catch (err) {
    const data = err.response ? err.response.data : 'Something went wrong';
    dispatch({ type: PRODUCT_ERROR, payload: data });
    console.log(err.message);
  }
};

export const addProduct = (product, router) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.addProduct(product);
    dispatch({ type: ADD_PRODUCT, payload: data });
    dispatch({ type: STOP_LOADING });
    router.push('/products');
  } catch (err) {
    const data = err.response ? err.response.data : 'Something went wrong';
    dispatch({ type: PRODUCT_ERROR, payload: data });
    dispatch({ type: STOP_LOADING });
  }
};
export const updateProduct = (id, product, router) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updateProduct(id, product);
    dispatch({ type: UPDATE_PRODUCT, payload: data });
    dispatch({ type: STOP_LOADING });
    router.push('/products');
  } catch (err) {
    const data = err.response ? err.response.data : 'Something went wrong';
    dispatch({ type: PRODUCT_ERROR, payload: data });
    dispatch({ type: STOP_LOADING });
  }
};

export const deleteProduct =
  (id, router = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.deleteProduct(id);
      dispatch({ type: DELETE_PRODUCT, payload: data._id });
      dispatch({ type: STOP_LOADING });
      // eslint-disable-next-line no-unused-expressions
      router ? router.push('/products') : (window.location = '/products');
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

export const resetPrdoError = () => ({ type: RESET_PROD_ERROR });
