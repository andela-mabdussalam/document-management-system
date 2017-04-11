import { GET_PUBLIC_DOCUMENTS, GET_DOCUMENT, CREATE_DOCUMENT,
   GET_USER_DOCUMENTS, UPDATE_DOCUMENT } from '../actions/types';


export default (state = { items: [], count: 0 }, action) => {
  switch (action.type) {
  case GET_PUBLIC_DOCUMENTS:
    return Object.assign({}, state, { items: action.documents },
    { count: action.count });

  case GET_DOCUMENT:
    return Object.assign({ currentDoc: action.document }, state);

  case GET_USER_DOCUMENTS:
    return Object.assign({ userDocument: action.document }, state);

  case CREATE_DOCUMENT:
    return Object.assign({}, state,
       { items: [].concat(state.items, action.document) });

  case UPDATE_DOCUMENT:
    return Object.assign({}, state,
    { items: [].concat(state.items, action.document) });

  default: return state;
  }
};
