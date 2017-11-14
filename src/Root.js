import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { BrowserRouter, browserHistory } from "react-router-dom";
import setUpStore from "./store";
import "purecss/build/pure.css";

import routes from "./routes";

class Root extends Component {
  componentWillMount = () => {
    const store = setUpStore();
    this.setState({ store });
    store.subscribe(this.handleDispatch);
  };

  handleDispatch = () => {
    const state = this.state.store.getState();
    localStorage.setItem("storeState", JSON.stringify(state));
  };

  render() {
    if (!this.state.store) return <div>Loading...</div>;
    return (
      <Provider store={this.state.store}>
        <BrowserRouter>{routes}</BrowserRouter>
      </Provider>
    );
  }
}

export default Root;
