import {actionTypesFor} from 'trivial-redux'

const initialState = {
  profileData: {},
  fetching: false
}

export default {
  entry: "users/profile",
  skipFormat: true,
  initialState: initialState,
  reducer(state, action) {
    const authActions = actionTypesFor('create','auth')
    switch (action.type) {
      case authActions.success:
        return {...state, profileData: action.payload};
      default:
        return state;
    }
  }
}
