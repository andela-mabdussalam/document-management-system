import axios from 'axios';
import { GET_PUBLIC_DOCUMENTS, GET_DOCUMENT } from './types';


export function getPublicDocuments(documents) {
  return {
    type: GET_PUBLIC_DOCUMENTS,
    documents
  }
}
export function viewDocument(document) {
  return {
    type: GET_DOCUMENT,
    document
  }
}
export function getPublicDocs() {
  console.log("I got here");
  return dispatch => {
    return axios.get('/api/documents')
    .then((documents) => {
      console.log('documents', documents);
      return dispatch(getPublicDocuments(documents));
    });
  }
}

export function viewDoc(id) {
  return dispatch => {
    return axios.get(`/api/documents/${id}`)
    .then((response) => {
      return dispatch(viewDocument(response.data));
    });
  }
}
