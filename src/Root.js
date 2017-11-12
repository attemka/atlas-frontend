import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import setUpStore from "./store";

import Routes from "./routes";
import App from "./containers/App";

class Root extends Component {
  componentWillMount = () => {
    const store = setUpStore();
    this.setState({ store });
  };

  render() {
    if (!this.state.store) return <div>Loading...</div>;
    return (
      <Provider store={this.state.store}>
        <Router>
          <Switch>
            <App>{Routes}</App>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default Root;
