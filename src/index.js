import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppConnect from './App';
import store from './configureStore';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppConnect store={store} />, document.getElementById('root'));
registerServiceWorker();
