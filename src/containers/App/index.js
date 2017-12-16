import React, { Component } from "react";
import { connect } from "react-redux";
import withRouter from "../../hoc/with-router";
import { Route } from "react-router";
import Home from "../Home";
import Login from "../Login";
import NewRequest from "../Requests/NewRequest";
import RequestsList from "../Requests/RequestsList";
import RequestItem from "../Requests/RequestItem";
import SignUp from "../SignUp";
import "./App.scss";
import HeaderAppbar from "../../components/header-appbar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Profile from '../Profile';
import Filial from '../Filial';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="app-wrapper">
          <HeaderAppbar history={this.props.history} />
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route exact path="/requests/" component={RequestsList} />
          <Route exact path="/requests/new" component={NewRequest} />
          <Route exact path="/requests/:id(\d+)" component={RequestItem} />
          <Route path="/profile" component={Profile} />
          <Route path="/filial" component={Filial} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
