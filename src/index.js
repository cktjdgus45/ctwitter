import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import app from './service/firebase';
import AuthService from './service/auth';

const authService = new AuthService();

ReactDOM.render(
  <React.StrictMode>
    <App AuthService={authService} />
  </React.StrictMode>,
  document.getElementById('root')
);
