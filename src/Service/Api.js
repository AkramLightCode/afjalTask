import axios from 'axios';
import SERVER_URL from './ApiEndPoint';

function baseAxios(options) {
  const defaultHeaders = options
    ? {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + options,
      }
    : {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

  return axios.create({
    baseURL: SERVER_URL,
    headers: defaultHeaders,
  });
}

function executeRequest(method, pathname, data, options = {}) {
  console.log('Request Data == ', method, SERVER_URL + pathname, data, options);

  const body = method === 'get' || !data ? {} : {data};
  const reqObj = options.query
    ? {method, url: pathname, params: options.query, ...body}
    : {method, url: pathname, ...body};

  const baseAxiosRequest = baseAxios(options);

  console.log('baseAxiosRequest:::', JSON.stringify(baseAxiosRequest));

  return new Promise((resolve, reject) => {
    return baseAxiosRequest
      .request(reqObj)
      .then(res => {
        // console.log('Request Success == ', res);
        resolve(res.data);
      })
      .catch(error => {
        // console.log('Request Error == ', error);
        reject(error);
      });
  });
}

export default {
  get(pathname, options) {
    return executeRequest('get', pathname, null, options);
  },

  post(pathname, data, options) {
    return executeRequest('post', pathname, data, options);
  },

  put(pathname, data, options) {
    return executeRequest('put', pathname, data, options);
  },

  delete(pathname, options) {
    return executeRequest('delete', pathname, null, options);
  },

  all(promises) {
    return axios.all(promises);
  },

  handleResponse(response) {
    if (response) {
      if (response && response.code == 200) {
        return {success: true, data: response.data};
      } else {
        let message =
          typeof response.message === 'string'
            ? response.message
            : typeof response.message === 'object'
            ? response.message.denied
              ? this.handleError(response.message.denied)
              : response.message.incorrect_password
              ? this.handleError(response.message.incorrect_password)
              : response.message.invalid_email
              ? this.handleError(response.message.invalid_email)
              : 'Some Error'
            : 'Some Error!';
        return {success: false, data: response.message};
      }
    }
  },

  handleError(message) {
    return typeof message === 'object' &&
      Array.isArray(message) &&
      message.length > 0
      ? message[0]
      : 'Some Error';
  },
};
