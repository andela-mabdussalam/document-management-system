import axios from 'axios';
import { GET_PUBLIC_DOCUMENTS } from './types';

export function getPublicDocuments(documents) {
  return {
    type: GET_PUBLIC_DOCUMENTS,
    documents
  }
}

export function getPublicDocs() {
  return dispatch => {
    return axios.get('/api/documents/:id')
    .then((documents) => {
      return dispatch(getPublicDocuments(documents));
    });
  }
}
