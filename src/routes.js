import React from "react";
import { Route, Redirect, IndexRoute } from "react-router";
import App from "./containers/App/index";
import Home from "./containers/Home";
import Login from "./containers/Login";

const routes = <Route path="/" component={App} />;

export default routes;
