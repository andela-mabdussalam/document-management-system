import React from 'react';
import { Route } from 'react-router-dom';
import App from './components/App';
import HomePage from './components/home/HomePage';
import LandingPage from './components/landing/LandingPage';
import LoginPage from './components/home/loginPage';
import SignUpPage from './components/home/signUpPage';
import TabsExampleSimple from './components/document/Dashboard';
import { IndexRoute } from 'react-router';
export default (
  <div>
    <IndexRoute component={SignUpPage} />
    <Route exact path="/" component={SignUpPage} />
    <Route path="login" component={LoginPage} />
  </div>
);
