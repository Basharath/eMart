import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from '../actionTypes';

const categoriesReducer = (categories = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return [...action.payload];

    case ADD_CATEGORY:
      return [...categories, ...action.payload];

    case UPDATE_CATEGORY:
      return [
        ...categories.map((c) =>
          c._id === action.payload._id ? action.payload : c
        ),
      ];

    case DELETE_CATEGORY:
      return [...categories.filter((c) => c._id !== action.payload._id)];

    default:
      return categories;
  }
};

export default categoriesReducer;
