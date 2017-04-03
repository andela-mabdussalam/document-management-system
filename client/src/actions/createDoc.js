import axios from 'axios';

export function createNewDoc(document) {
  return dispatch => {
    return axios.post('/api/document', document);

  }
}
