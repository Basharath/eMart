import { GET_CART, UPDATE_CART, CLEAR_CART } from '../actionTypes';

const cartReducer = (cart = {}, action) => {
  switch (action.type) {
    case GET_CART:
      return { ...cart, ...action.payload };

    case UPDATE_CART:
      return { ...cart, ...action.payload };

    case CLEAR_CART:
      return { ...cart, items: [] };

    default:
      return cart;
  }
};

export default cartReducer;
