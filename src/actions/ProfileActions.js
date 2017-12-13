import {actionTypesFor} from 'trivial-redux'

export function saveProfile(data){
  return {
    types: actionTypesFor('update','profile'),
    meta: {
      fetch: {
        url:'~user/profile',
        data,
        method: 'PUT'
      }
    }
  }
}

export function getProfile(){
  return {
    types: actionTypesFor('index','profile'),
    meta: {
      fetch: {
        url:'~user/profile',
      }
    }
  }
}
