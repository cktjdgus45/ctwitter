import './App.css';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './routes/auth.jsx';
import Home from './routes/home.jsx';
import Profile from './routes/profile';


function App({ AuthService, fireStore, fileUploader }) {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {
            (
              <>
                <Route exact path="/" element={<Auth AuthService={AuthService} />}></Route>
                <Route exact path="/home" element={<Home AuthService={AuthService} fireStore={fireStore} fileUploader={fileUploader} />}></Route>
                <Route exact path="/profile" element={<Profile />}></Route>
              </>
            )
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
