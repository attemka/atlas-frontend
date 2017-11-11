import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Routes from './routes';
import App from './containers/App';

class Root extends Component {

  render() {
    //const { store } = this.props;
    return (
      <Provider>
      {/*<Provider store={store}>*/}
          <Router>
            <Switch>
              <App>
                {Routes}
              </App>
            </Switch>
          </Router>
      </Provider>
    )
  }
}

export default Root;