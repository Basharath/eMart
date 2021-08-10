import { GET_ORDERS, POST_ORDER, CANCEL_ORDER } from '../actionTypes';

const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return [...state, action.payload];

    case POST_ORDER:
      return [...state, action.payload];

    case CANCEL_ORDER:
      return [...state.filter((o) => o._id !== action.payload._id)];

    default:
      return state;
  }
};

export default ordersReducer;
