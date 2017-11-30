const initialState = {
  totalPages: 0,
  productsList: [],
};

export default {
  entry: "~requests",
  skipFormat: true,
  initialState,
  reducer(state, action) {
    switch (action.type) {
    case this.types.index.success:
      return {
        ...state,
        totalPages: action.payload.count,
        productsList: action.payload.results,
      };
    default:
      return state;
    }
  },
};
