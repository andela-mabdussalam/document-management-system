import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Router, Route } from 'react-router-dom';
import routes from './routes';
import setAuthorizationToken from './utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import { setCurrentUser } from './actions/authActions';
import './styles/styles.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import App from './components/App';
import HomePage from './components/home/HomePage';
import LandingPage from './components/landing/LandingPage';
import LoginPage from './components/home/loginPage';
import SignUpPage from './components/home/signUpPage';
import TabsExampleControlled from './components/document/Dashboard';
import ViewDoc from './components/document/ViewDoc';
import NewDocument from './components/document/NewDocument';


const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}
setAuthorizationToken(localStorage.jwtToken);
render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <App>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/dashboard" component={TabsExampleControlled} />
          <Route path="/document/:id" component={ViewDoc} />
          <Route path="/dashes/create" component={NewDocument} />
        </App>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
