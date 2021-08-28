import {
  GET_ORDERS,
  GET_ORDER,
  POST_ORDER,
  CANCEL_ORDER,
  ORDER_ERROR,
  RESET_ORDERS,
} from '../actionTypes';

const ordersReducer = (
  state = { orders: [], order: null, recentOrder: null, error: null },
  action
) => {
  switch (action.type) {
    case GET_ORDERS:
      return { ...state, orders: action.payload, error: null };

    case GET_ORDER:
      return { ...state, order: action.payload, error: null };

    case POST_ORDER:
      return { ...state, recentOrder: action.payload, error: null };

    case CANCEL_ORDER:
      return {
        ...state,
        orders: state.orders.filter((o) => o._id !== action.payload._id),
      };

    case ORDER_ERROR:
      return { ...state, error: action.payload };

    case RESET_ORDERS:
      return { orders: [], order: null, recentOrder: null, error: null };

    default:
      return state;
  }
};

export default ordersReducer;
