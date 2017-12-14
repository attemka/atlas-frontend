import update from "immutability-helper";

const initialState = {
  totalPages: 0,
  requestsList: [],
  currentRequestMetaInfo: {
    fromAccount: [],
    toAccount: undefined,
    requestType: undefined
  }
};

function replaceRequestById(state, request) {
  const indexReplace = state.requestsList.findIndex(r => (r.id = request.id));
  let newRequests = state.requestsList;
  if (indexReplace !== -1) newRequests = update(state.requestsList, { $splice: [[indexReplace, 1, request]] });
  return { ...state, requestsList: newRequests };
}

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
        requestsList: action.payload.results
      };
    case this.types.update.success:
      return replaceRequestById(state, action.payload);
    case this.types.show.success:
      if (action.request_id) return replaceRequestById(state, action.payload);
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
