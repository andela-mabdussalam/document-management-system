import { GET_PUBLIC_DOCUMENTS , GET_DOCUMENT,CREATE_DOCUMENT } from '../actions/types';
import isEmpty from 'lodash/isEmpty';

export default (state = [], action) => {
  switch(action.type) {
   case GET_PUBLIC_DOCUMENTS:
     return [...state, Object.assign({}, action.documents)];

  case GET_DOCUMENT:
     return Object.assign({currentDoc: action.document}, state);

  case CREATE_DOCUMENT:
       return [...state, Object.assign({}, action.document)];
      default: return state;
  }
}
