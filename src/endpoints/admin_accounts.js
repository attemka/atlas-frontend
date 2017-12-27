import { actionTypesFor } from "trivial-redux";

const initialState = {
    accountList: [],
};

export default {
    entry: "~admin2/accounts",
    skipFormat: true,
    initialState,
    reducer(state, action) {
        switch (action.type) {
            case this.types.index.success:
                return { ...state, accountList: action.payload};
            default:
                return state;
        }
    }
};