import {
  GET_PRODUCTS,
  GET_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  RATE_PRODUCT,
  DELETE_PRODUCT,
} from '../actionTypes';

const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.payload };

    case GET_PRODUCT:
      return { ...state, product: action.payload };

    case ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };

    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
      };

    case RATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((p) => p._id !== action.payload),
      };

    default:
      return state;
  }
};

export default productReducer;
