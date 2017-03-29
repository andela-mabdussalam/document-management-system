import axios from 'axios';

export function userSignUpRequest(userData) {
  return dispatch => {
    return axios.post('/api/users/signup', userData);

  }
}
export function isUserExists(identifier) {
  return dispatch => {
    return axios.get(`/api/users/${identifier}`);

  }
}
