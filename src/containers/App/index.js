import React, { Component } from "react";
import { connect } from "react-redux";
import withRouter from "../../hoc/with-router";
import { Route } from "react-router";
import Home from "../Home";
import Login from "../Login";
import Requests from "../Requests";
import SignUp from "../SignUp";
import "./App.scss";
import HeaderAppbar from "../../components/header-appbar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="app-wrapper">
          <HeaderAppbar />
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/requests" component={Requests} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
