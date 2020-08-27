import React from 'react';
import ReactDOM from 'react-dom';

import './scss/index.scss';
import App from './App';
import { AuthContextProvider } from './context';
import * as serviceWorker from './serviceWorker';
import mockAPI from './util/api/mock-api';


// Start Mock API in development
if(process.env.NODE_ENV === 'development') {
  mockAPI({ environment: 'development' });
}

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
