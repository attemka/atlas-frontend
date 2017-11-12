import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import fetchMiddleware, { promiseMiddleware } from "fetch-middleware-for-redux";
import reduxThunk from "redux-thunk";
import unwrapMiddleware from "./middlewares/unwrapMiddleware";
import urlMiddleware from "./middlewares/urlMiddleware";
import api from "./api";

const middlewares = [reduxThunk, urlMiddleware, fetchMiddleware, promiseMiddleware, unwrapMiddleware];

const enhancers = [applyMiddleware(...middlewares)];

const reducers = combineReducers(Object.assign({}, api.reducers));

export default function setUpStore() {
  return getDefaultStorage();
}

function getDefaultStorage() {
  const store = createStore(reducers, {}, compose(...enhancers));
  global.store = store;
  return store;
}
