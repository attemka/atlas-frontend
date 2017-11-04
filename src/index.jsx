import React from 'react';
import ReactDOM from 'react-dom';
import Table from './components/Table/Table';
import { AppContainer } from 'react-hot-loader'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <AppContainer>
    <Table />
  </AppContainer>,
  document.getElementById('app')
);
//registerServiceWorker();

if (module.hot) {
  module.hot.accept('./index', () => {
    const NextApp = require('./index').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp/>
      </AppContainer>,
      document.getElementById('app')
    );
  });
}