import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import users from './reducers/users';
import getDocuments from './reducers/getDocuments';
import roles from './reducers/roles';

export default combineReducers({
  flashMessages,
  auth,
  getDocuments,
  users,
  roles
});
