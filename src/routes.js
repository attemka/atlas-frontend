import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./containers/Home";
import App from "./containers/App";
import Home from "./containers/Home"
import Login from "./containers/Login"

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="*" component={Home}>
      {/*<Route path="/anypath" component={anycomponent} />*/}
      <Redirect to="/" />
    </Route>
  </Switch>
);
