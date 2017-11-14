import { cloneDeep } from "lodash";

let isValidFetchingAction = action => action.types && action.meta && action.meta.fetch && action.meta.fetch.url;

let toEndPointUrl = url => `https://attemka.ru/${url.substr(1)}`;

export default store => next => action => {
  if (isValidFetchingAction(action) && action.meta.fetch.url[0] == "~") {
    const { auth } = store.getState();
    action = cloneDeep(action);
    action.meta.fetch.url = toEndPointUrl( action.meta.fetch.url);
    action.meta.fetch.headers = {
      Authorization: "Token " + auth.token
    };
    return next(action);
  }
  return next(action);
};
