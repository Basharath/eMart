import axios from 'axios';

const url = 'https://emartt.herokuapp.com/api';
const productsUrl = `${url}/products`;

export const fetchProducts = () => axios.get(productsUrl);
export const creatPost = (newProduct) => axios.post(productsUrl, newProduct);
