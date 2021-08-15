import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = process.env.REACT_APP_API_URL;
const API = axios.create({ baseURL });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token-emart');
  if (token) {
    req.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  }
  return req;
});

API.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error('An unexpected error occurred');
  }

  return Promise.reject(error);
});

const productsUrl = '/products';
const ordersUrl = '/orders';
const cartUrl = '/cart';
const categoriesUrl = '/categories';
const usersUrl = '/users';

export const getProducts = () => API.get(productsUrl);
export const getProduct = (id) => API.get(`${productsUrl}/${id}`);
export const addProduct = (newProduct) =>
  API.post(productsUrl, newProduct, { 'Content-Type': 'image/jpeg' });
export const updateProduct = (id, product) =>
  API.put(`${productsUrl}/${id}`, product);
export const deleteProduct = (id) => API.delete(`${productsUrl}/${id}`);
export const rateProduct = (id, rating) =>
  API.patch(`${productsUrl}/${id}`, rating);

export const getOrders = () => API.get(ordersUrl);
export const postOrder = (newOrder) => API.post(ordersUrl, newOrder);
export const cancelOrder = (id) => API.delete(`${ordersUrl}?id=${id}`);

export const getCart = () => API.get(cartUrl);
export const updateCart = (newItem) => API.post(cartUrl, newItem);
export const clearCart = () => API.delete(cartUrl);

export const getCategories = () => API.get(categoriesUrl);
export const addCategory = (newCategory) =>
  API.post(categoriesUrl, newCategory);
export const updateCategory = (id, updatedCategory) =>
  API.put(`${categoriesUrl}/${id}`, updatedCategory);
export const deleteCategory = (id) => API.put(`${categoriesUrl}/${id}`);

export const signInUser = (userData) =>
  API.post(`${usersUrl}/signin`, userData);
export const signUpUser = (userData) =>
  API.post(`${usersUrl}/signup`, userData);
