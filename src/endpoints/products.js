import { actionTypesFor } from "trivial-redux";

const initialState = {
  totalPages: 0,
  productsList: [],
  fetching: false
};

export default {
  entry: "~products",
  skipFormat: true,
  initialState,
  reducer(state, action) {
    switch (action.type) {
    case this.types.index.load:
      return {
        ...state,
        fetching: true
      };
    case this.types.index.success:
      return {
        ...state,
        totalPages: action.payload.count,
        productsList: action.payload.results,
        fetching: false
      };
    case this.types.index.failure:
      return {
        ...state,
        fetching: false
      };
    default:
      return state;
    }
  }
};
