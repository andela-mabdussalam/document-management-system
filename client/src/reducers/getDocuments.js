import { GET_PUBLIC_DOCUMENTS , GET_DOCUMENT,CREATE_DOCUMENT, GET_USER_DOCUMENTS } from '../actions/types';
import isEmpty from 'lodash/isEmpty';

export default (state = [], action) => {
  switch(action.type) {
   case GET_PUBLIC_DOCUMENTS:
     return [...state, Object.assign({}, action.documents)];

  case GET_DOCUMENT:
     return Object.assign({currentDoc: action.document}, state);

  case GET_USER_DOCUMENTS:
        return Object.assign({userDocument: action.document}, state);

  case CREATE_DOCUMENT:
      var docsLen = Object.keys(state[0]).length;
       var UpDocs = { [docsLen]: action.document };
       return [Object.assign({}, state[0], UpDocs)];
      default: return state;
  }
}
