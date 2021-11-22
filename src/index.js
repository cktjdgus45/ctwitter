import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import firebaseApp from './service/firebase';
import AuthService from './service/auth';
import fireStore from './service/firestore';

const authService = new AuthService();
const fireDB = new fireStore();

ReactDOM.render(
  <React.StrictMode>
    <App AuthService={authService} fireStore={fireDB} />
  </React.StrictMode>,
  document.getElementById('root')
);
