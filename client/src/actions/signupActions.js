import axios from 'axios';
import { SET_CURRENT_USER } from './types';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}
export function userSignUpRequest(userData) {
  return dispatch => {
    return axios.post('/api/users/signup', userData).then((res) => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    });

  }
}
export function isUserExists(identifier) {
  return dispatch => {
    return axios.get(`/api/users/${identifier}`);

  }
}
