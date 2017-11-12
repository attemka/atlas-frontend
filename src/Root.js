import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { BrowserRouter, browserHistory } from "react-router-dom";
import setUpStore from "./store";

import routes from "./routes";
import App from "./containers/App";

class Root extends Component {
  componentWillMount = () => {
    const store = setUpStore();
    this.setState({ store });
  };

  render() {
    if (!this.state.store) return (<div>Loading...</div>);
    return (
      <Provider store={this.state.store}>
        <BrowserRouter>
          {routes}
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Root;
