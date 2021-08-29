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
  PRODUCT_ERROR,
  RESET_PROD_ERROR,
  SEARCHED_PRODUCTS,
} from '../actionTypes';

const productReducer = (
  state = {
    products: [],
    searchProds: [],
    product: {},
    isLoading: true,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };

    case STOP_LOADING:
      return { ...state, isLoading: false };

    case GET_PRODUCTS:
      return { ...state, products: action.payload, error: null };

    case GET_VENDOR_PRODS:
      return { ...state, vendorProds: action.payload, error: null };

    case SEARCHED_PRODUCTS:
      return { ...state, searchProds: action.payload, error: null };

    case GET_PRODUCT:
      return { ...state, product: action.payload, error: null };

    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
        error: null,
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
        vendorProds: state.vendorProds.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
        error: null,
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

    case PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case RESET_PROD_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default productReducer;
