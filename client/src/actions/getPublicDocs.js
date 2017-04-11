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
export function getPublicDocuments(documents, count) {
  return {
    type: GET_PUBLIC_DOCUMENTS,
    documents,
    count
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
        const count = response.data.result.pop();
        return dispatch(getPublicDocuments(response.data.result, count));
      });
  };
}
export function getUserDocument(params) {
  return (dispatch) => {
    return axios.get(`/api/user/1/document`)
      .then((response) => {
        // return dispatch(getUserDoc(response.data.result));
      });
  };
}
export function searchDocument(params) {
  return (dispatch) => {
    return axios.post(`/api/documents/search?query=${params}`)
      .then((response) => {
        return dispatch(getPublicDocuments(response.data.result));
      });
  };
}
export function createNewDoc(docData) {
  return (dispatch) => {
    return axios.post('/api/documents', docData)
      .then((response) => {
        dispatch(createDoc(response.data.document));
      });
  };
}
export function updateDocument(docData, index) {
  return (dispatch) => {
    return axios.put(`/api/documents/${docData.id}`, docData)
      .then((response) => {
        return dispatch(getPublicDocs({ limit: 40, offset: 0 }));
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
export function deleteDocument(id) {
  return (dispatch) => {
    return axios.delete(`/api/documents/${id}`)
      .then((response) => {
        return dispatch(getPublicDocs({ limit: 40, offset: 0 }));
      });
  };
}
