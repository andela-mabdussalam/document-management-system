// import axios from 'axios';
// import { CREATE_DOCUMENT } from './types';
//
// export function createDoc(message) {
//   return {
//     type: CREATE_DOCUMENT,
//     message
//   };
// }
// export function createNewDoc(docData) {
//   return dispatch => {
//     return axios.post('/api/documents', docData)
//       .then((response) => {
//         console.log(response.data.document);
//         return dispatch(createDoc(response.data.document));
//       });
//   };
// }
