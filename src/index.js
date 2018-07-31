import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import './index.css';
import { Provider } from 'react-redux';
import {createStore , applyMiddleware} from 'redux';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 

import reducers from './reducers/index';

const store = createStore(reducers , {} , applyMiddleware(thunk));

ReactDOM.render(
  <Provider store = {store}>
  <App />
  </Provider>
, document.getElementById('root'));
