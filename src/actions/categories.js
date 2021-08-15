import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from '../actionTypes';
import * as api from '../api';

export const getCategories = () => async (dispatch) => {
  try {
    const { data } = await api.getCategories();
    dispatch({ type: GET_CATEGORIES, payload: data });
  } catch (err) {
    console.log('Categories ERR', err.response?.data);
  }
};

export const addCategory = (category) => async (dispatch) => {
  try {
    const { data } = await api.addCategory(category);
    dispatch({ type: ADD_CATEGORY, payload: data });
  } catch (err) {
    console.log('Categories ERR', err.response?.data);
  }
};

export const updateCategory = (id, category) => async (dispatch) => {
  try {
    const { data } = await api.updateCategory(id, category);
    dispatch({ type: UPDATE_CATEGORY, payload: data });
  } catch (err) {
    console.log('Categories ERR', err.response?.data);
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteCategory(id);
    dispatch({ type: DELETE_CATEGORY, payload: data });
  } catch (err) {
    console.log('Categories ERR', err.response?.data);
  }
};
