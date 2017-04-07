import axios from 'axios';
import { GET_ROLES, CREATE_ROLE} from './types';


export function roles(roles) {
  return {
    type: GET_ROLES,
    roles
  }
}
export function role(role) {
  return {
    type: CREATE_ROLE,
    role
  }
}
export function getRoles() {
  return dispatch => {
    return axios.get('/api/roles')
    .then((response) => {
      return dispatch(roles(response.data));
    });
  }
}
export function createRole(title) {
  return dispatch => {
    return axios.post('/api/roles',title)
    .then((response) => {
      return dispatch(role(response.data));
    });
  }
}
