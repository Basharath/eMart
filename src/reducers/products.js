import {
  GET_PRODUCTS,
  GET_VENDOR_PRODS,
  GET_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  RATE_PRODUCT,
  DELETE_PRODUCT,
  START_LOADING,
  STOP_LOADING,
} from '../actionTypes';

const productReducer = (state = { products: [], isLoading: true }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };

    case STOP_LOADING:
      return { ...state, isLoading: false };

    case GET_PRODUCTS:
      return { ...state, products: action.payload };

    case GET_VENDOR_PRODS:
      return { ...state, vendorProds: action.payload };

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

    case 'PRODUCT_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
