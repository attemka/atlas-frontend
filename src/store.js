import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import fetchMiddleware, {promiseMiddleware} from 'fetch-middleware-for-redux'
import reduxThunk from 'redux-thunk'
import unwrapMiddleware from './middlewares/unwrapMiddleware'
import urlMiddleware from './middlewares/urlMiddleware'
import api from './api'


const middlewares = [
  reduxThunk,
  shopUrlMiddleware,
  fetchMiddleware,
  promiseMiddleware,
]

const enhancers = [applyMiddleware(...middlewares)]

const reducers = combineReducers(Object.assign({}, api.reducers))


export default setUpStore(){
  return getDefaultStorage()
}

function getDefaultStorage(){
  const store = createStore(
    reducers,
    {},
    compose(...enhancers)
  )
  if(__DEV__) global.store = store
  return store
}
