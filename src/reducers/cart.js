import { GET_CART, UPDATE_CART, CLEAR_CART } from '../actionTypes';

const cartReducer = (cart = [], action) => {
  switch (action.type) {
    case GET_CART:
      return [...action.payload];

    case UPDATE_CART:
      return [...action.payload];

    case CLEAR_CART:
      return [];

    default:
      return cart;
  }
};

export default cartReducer;
