import {actionTypesFor} from 'trivial-redux';

export function login(email, password){
  return {
    types: actionTypesFor('create', 'auth'),
    meta:{
      fetch:{
        url: '~user/login',
        method: 'POST',
        data:{
          email,
          password
        }
      },
      password,
      email
    }
  }
}
