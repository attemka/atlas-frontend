import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

export const LoginRoute = <Route path="/login" component={Login} />;

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="*" component={Home}>
      {/*<Route path="/anypath" component={anycomponent} />*/}
      <Redirect to="/" />
    </Route>
  </Switch>
);