import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppConnect from './App';
import store from './configureStore';
import MainApp from './MainApp';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render( 
<Provider store={store} >
<MainApp />
</Provider>
, document.getElementById('root'));
registerServiceWorker();
