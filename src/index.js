import React from 'react';
import ReactDOM from 'react-dom';
import Table from './components/Table/Table';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Table />, document.getElementById('root'));
registerServiceWorker();