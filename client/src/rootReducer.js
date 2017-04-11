import { combineReducers } from 'redux';
import auth from './reducers/auth';
import users from './reducers/users';
import getDocuments from './reducers/getDocuments';
import roles from './reducers/roles';

export default combineReducers({
  auth,
  getDocuments,
  users,
  roles
});
