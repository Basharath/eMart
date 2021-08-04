export default (products = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL':
      return action.payload;
    case 'FETCH_ONE':
      return products.filter((p) => p._id === action.payload._id);
    default:
      return products;
  }
};
