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
export function searchDocs(document) {
  return {
    type: SEARCH_DOCUMENT,
    document
  }
}
export function getPublicDocs(params) {
  return dispatch => {
    return axios.get(`/api/documents?offset=${params.offset}&limit=${params.limit}`)
    .then((response) => {
      return dispatch(getPublicDocuments(response.data.result));
    });
  }
}
export function searchDocument(params) {
  console.log(params);
  return dispatch => {
    return axios.post(`/api/documents/search?query=${params}`)
    .then((response) => {
      console.log('the search word is', response);
      return dispatch(getPublicDocuments(response.data.result));
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
