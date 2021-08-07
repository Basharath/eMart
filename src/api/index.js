import axios from 'axios';

const url = 'https://emartt.herokuapp.com/api';
const productsUrl = `${url}/products`;
const ordersUrl = `${url}/orders`;
const cartUrl = `${url}/cart`;
const categoriesUrl = `${url}/categories`;
const usersUrl = `${url}/users`;

export const getProducts = () => axios.get(productsUrl);
export const getProduct = (id) => axios.get(id);
export const addProduct = (newProduct) => axios.post(productsUrl, newProduct);
export const updateProduct = (id, product) =>
  axios.put(`${productsUrl}/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${productsUrl}/${id}`);
export const rateProduct = (id, rating) =>
  axios.patch(`${productsUrl}/${id}`, rating);

export const getOrders = () => axios.get(ordersUrl);
export const postOrder = (newOrder) => axios.post(ordersUrl, newOrder);
export const cancelOrder = (id) => axios.delete(`${ordersUrl}?id=${id}`);

export const getCart = () => axios.get(cartUrl);
export const updateCart = (newItem) => axios.post(cartUrl, newItem);
export const clearCart = () => axios.delete(cartUrl);

export const getCategories = () => axios.get(categoriesUrl);
export const addCategory = (newCategory) =>
  axios.post(categoriesUrl, newCategory);
export const updateCategory = (id, updatedCategory) =>
  axios.put(`${categoriesUrl}/${id}`, updatedCategory);
export const deleteCategory = (id) => axios.put(`${categoriesUrl}/${id}`);

export const signInUser = (userData) =>
  axios.post(`${usersUrl}/signin`, userData);
export const signUpUser = (userData) =>
  axios.post(`${usersUrl}/signup`, userData);
