import * as api from '../api';

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchProducts();
    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (err) {
    console.log('Error', err.message);
  }
};

export const getProduct = (id) => ({ type: 'FETCH_ONE', payload: { _id: id } });
