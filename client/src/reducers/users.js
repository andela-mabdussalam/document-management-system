import { GET_USERS, EDIT_USER, DELETE_USER } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
  case GET_USERS:
    return action.users;

  case EDIT_USER: {
    const oldState = [...state];
    const updatedState = oldState.map((user) => {
      if (user.id === action.user.id) {
        return Object.assign({}, user, action.user);
      }
      return user;
    });
    return updatedState;
  }
  case DELETE_USER:
    return state.filter(user => user.id !== action.user.id);

  default: return state;
  }
};
