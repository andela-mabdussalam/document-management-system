import { GET_ROLES, CREATE_ROLE } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {

  case GET_ROLES:
    return action.roles;

  case CREATE_ROLE:
    return [...state, Object.assign({}, action.role)];
  default: return state;
  }
};
