import {btoa} from 'Base64'

const initialState = {
  token: undefined,
  email: undefined,
  authenticated:false,
  fetching:false
}

function successAuth(state, email, password){
  const token = btoa(`${email}:${password}`)
  return {...state, fetching:false, authenticated:true, token, email}
}

export default {
  entry:'users/auth'
  skipFormat:true,
  initialState: initialState,
  reducer(state, action){
    switch(action.type){
      case this.types.create.load:
        return {...state, fetching:true}
      case this.types.create.success:
        return successAuth(state, action.meta.email, action.meta.password)
      default:
        return state
    }
  }
}
