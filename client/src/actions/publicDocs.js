import axios from 'axios';
import {
  GET_PUBLIC_DOCUMENTS, GET_DOCUMENT,
  UPDATE_DOCUMENT, GET_USER_DOCUMENTS,
  CREATE_DOCUMENT
} from './types';


export function createDoc(document) {
  return {
    type: CREATE_DOCUMENT,
    document
  };
}
export function getPublicDocuments(documents) {
  return {
    type: GET_PUBLIC_DOCUMENTS,
    documents
  };
}
export function getUserDoc(documents) {
  return {
    type: GET_USER_DOCUMENTS,
    documents
  };
}
export function viewDocument(document) {
  return {
    type: GET_DOCUMENT,
    document
  };
}
export function searchDocs(document) {
  return {
    type: SEARCH_DOCUMENT,
    document
  };
}
export function update(document) {
  return {
    type: UPDATE_DOCUMENT,
    document
  };
}
export function getPublicDocs(params) {
  return (dispatch) => {
    return axios.get(`/api/documents?offset=${params.offset}&limit=${params.limit}`)
      .then((response) => {
        return dispatch(getPublicDocuments(response.data.result));
      });
  };
}
export function getUserDocument(params) {
  console.log('process has started ooo', params);
  return (dispatch) => {
    return axios.get(`/api/user/1/document`)
      .then((response) => {
        console.log('res is', response);
        return dispatch(getUserDoc(response.data.result));
      });
  };
}
export function searchDocument(params) {
  return (dispatch) => {
    return axios.post(`/api/documents/search?query=${params}`)
      .then((response) => {
        console.log('the response is', response);
        return dispatch(getPublicDocuments(response.data.result));
      });
  }
}
export function createNewDoc(docData) {
  return (dispatch) => {
    return axios.post('/api/documents', docData)
      .then((response) => {
        console.log(response.data.document);
        dispatch(createDoc(response.data.document));
      });
  };
}
export function updateDocument(docData) {
  return (dispatch) => {
    return axios.put(`/api/documents/${docData.id}`, docData)
      .then((response) => {
        console.log(response);
        return dispatch(getPublicDocuments(response.data.document));
      });
  };
}
export function viewDoc(id) {
  return (dispatch) => {
    return axios.get(`/api/documents/${id}`)
      .then((response) => {
        return dispatch(viewDocument(response.data));
      });
  };
}
