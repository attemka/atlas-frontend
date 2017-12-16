import { actionTypesFor } from "trivial-redux";

const initialState = {
  accountList: [],
  currentAccount: undefined
};

export default {
  entry: "~user/account",
  skipFormat: true,
  initialState,
  reducer(state, action) {
    switch (action.type) {
    case actionTypesFor("index", "profile").success:
      return { ...state, currentAccount: action.payload.account };
    case this.types.index.success:
      return { ...state, accountList: action.payload };
    case this.types.update.success:
      return {... state, currentAccount: action.payload};
    default:
      return state;
    }
  }
};
