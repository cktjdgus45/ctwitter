import './App.css';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './routes/auth.jsx';
import Home from './routes/home.jsx';


function App({ AuthService }) {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {
            (
              <>
                <Route exact path="/" element={<Auth AuthService={AuthService} />}></Route>
                <Route exact path="/home" element={<Home />}></Route>
              </>
            )
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
