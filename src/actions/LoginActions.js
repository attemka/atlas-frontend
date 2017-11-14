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

export function signup(name, email, password, passwordRepeat) {
  return {
    types: actionTypesFor('create', 'auth'),
    meta:{
      fetch:{
        url: '~user/auth',
        method: 'POST',
        data:{
          name,
          email,
          password,
          password_confirmation: passwordRepeat,
        }
      },
      email,
      password,
    }
  }
}
