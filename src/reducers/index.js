import { combineReducers } from 'redux';

import products from './products';
import cart from './cart';
import auth from './auth';
import orders from './orders';
import categories from './categories';

export default combineReducers({ products, auth, cart, orders, categories });
