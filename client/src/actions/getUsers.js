import axios from 'axios';
import { GET_USERS, EDIT_USER , DELETE_USER, CREATE_USER} from './types';


export function getUsers(users) {
  return {
    type: GET_USERS,
    users
  }
}
export function edit(user) {
  return {
    type:EDIT_USER,
    user
  }
}
export function removeUser(user) {
  return {
    type:DELETE_USER,
    user
  }
}
export function create(user) {
  return {
    type:CREATE_USER,
    user
  }
}
export function getAllUsers(limit, offset) {
  return dispatch => {
    return axios.get(`/api/users?offset=${offset}&limit=${limit}`)
    .then((response) => {
      console.log('allUsers', response.data.users);
      return dispatch(getUsers(response.data.users));
    });
  }
}
export function deleteUser(user) {
  console.log('hey', user);
  return dispatch => {
    return axios.delete(`/api/users/${user.id}`)
    .then((response) => {
      console.log('response', response.data);
      return dispatch(removeUser(user));
    });
  }
}
export function editUser(userId, req) {
  console.log('user is', userId, req);
  return dispatch => {
    return axios.put(`/api/users/${userId}`,req)
    .then((user) => {
      console.log('users', user);
      return dispatch(edit(user.data));
    });
  }
}
export function createUser(user) {
  return dispatch => {
    return axios.post('/api/users/signup', user).then(res => {
    console.log('yo');
  });
  }
}
