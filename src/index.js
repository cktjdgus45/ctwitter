import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import firebaseApp from './service/firebase';
import AuthService from './service/auth';
import fireStore from './service/firestore';
import fileUpload from './service/storage';

const authService = new AuthService();
const fireDB = new fireStore();
const fileUploader = new fileUpload();

ReactDOM.render(
  <React.StrictMode>
    <App AuthService={authService} fireStore={fireDB} fileUploader={fileUploader} />
  </React.StrictMode>,
  document.getElementById('root')
);
