import React, { Component } from "react";
import { connect } from "react-redux";
import withRouter from "../hoc/with-router";
import {Route} from 'react-router'
import Home from "./Home";
import Login from "./Login"

import HeaderAppbar from "../components/header-appbar";

class App extends Component {

  render() {
    return (
      <div>
        <HeaderAppbar />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
      </div>)
  }
}

export default App;
