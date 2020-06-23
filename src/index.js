import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import App from './App';
import {CoffeeContextProvider} from "./coffeeContext";
import {AuthProvider} from './Auth';

ReactDOM.render(
  <CoffeeContextProvider>
    <AuthProvider>
    <Router>
      <App />
    </Router>
    </AuthProvider>
  </CoffeeContextProvider>,
  document.getElementById('root')
);

