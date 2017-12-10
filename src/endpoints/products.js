import { actionTypesFor } from "trivial-redux";

const initialState = {
  totalPages: 0,
  productsList: [],
  invoicesList: []
};

export default {
  entry: "~products",
  skipFormat: true,
  initialState,
  reducer(state, action) {
    switch (action.type) {
    case this.types.index.success:
      return {
        ...state,
        totalPages: action.payload.count,
        productsList: action.payload.results
      };
    case actionTypesFor("display", "requests").success:
      return {
        ...state,
        invoicesList: action.payload
      };
    default:
      return state;
    }
  }
};
