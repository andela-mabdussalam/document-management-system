import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import setAuthorizationToken from './utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import { setCurrentUser } from './actions/authActions';
import './styles/styles.css';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../../node_modules/materialize-css/dist/js/materialize.min.js';
// import '../../node_modules/materialize-css/dist/css/materialize.min.css';
// import '../../node_modules/material-ui/dist/css/materialize.min.css';

// import '../../node_modules/material-icons/css/material-icons.css';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

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
  <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
