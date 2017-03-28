import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import LandingPage from './components/landing/LandingPage';
import LoginPage from './components/home/loginPage';
import SignUpPage from './components/home/signUpPage';


export default (
  <Route path="/" component={App}>
  <IndexRoute component={HomePage} />
  <Route path="about" component={LandingPage} />
  <Route path="login" component={LoginPage} />
  <Route path="signup" component={SignUpPage} />
  </Route>
);
