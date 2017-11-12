import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import App from "./containers/App";

//export const LoginRoute = <Route path="/login" component={} />;

export default (
  <Switch>
    <Route exact path="/" component={App} />
    <Route path="*" component={App}>
      {/*<Route path="/anypath" component={anycomponent} />*/}
      <Redirect to="/" />
    </Route>
  </Switch>
);
