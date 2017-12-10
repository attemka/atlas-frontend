const initialState = {
  totalPages: 0,
  productsList: [],
  currentRequestMetaInfo: {
    fromAccount: [],
    toAccount: undefined,
    requestType: undefined
  }
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
        productsList: action.payload.results
      };
    case this.types.show.success:
      return {
        ...state,
        currentRequestMetaInfo: {
          fromAccount: action.payload.from_account,
          toAccount: action.payload.to_account,
          requestType: action.payload.invoice_type
        }
      };
    case this.types.create.success:
      return {
        ...state,
        currentRequestMetaInfo: {
          fromAccount: [],
          toAccount: undefined,
          requestType: undefined
        }
      };
    default:
      return state;
    }
  }
};
