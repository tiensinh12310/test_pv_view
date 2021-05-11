import axios from 'axios'
import config from '../configs/general'

const _http = axios.create({
  baseURL: config.apiUrl,
});

const refreshAccessToken = async function(){
  let token =  await _http.post('/auth/refresh-token', {
    accountName: localStorage.getItem('accountName'),
    refreshToken: localStorage.getItem('refreshToken')
  })
  localStorage.setItem('tokenType', token.tokenType)
  localStorage.setItem('accessToken', token.accessToken)
  localStorage.setItem('refreshToken', token.refreshToken)
  localStorage.setItem('expiresIn', token.expiresIn)

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.accessToken;

}

// Request interceptor for API calls
_http.interceptors.request.use(
  async config => {

    config.headers = {
      'Authorization': `Bearer ${localStorage.accessToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    return config;
  }
)

// Response interceptor for API calls
_http.interceptors.response.use(
  response => {
    return response.data
  },
  async error => {
    const originalRequest = error.config;
    const statusCode = error.response && error.response.status;

    if(statusCode === 401 || statusCode === 403){
      // retry fresh token
      if(originalRequest.url !== "/auth/refresh-token" && originalRequest.url !== "/auth/login"){
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          await refreshAccessToken();
          return _http(originalRequest);
        }
      }
    }

    error.message = (error.response && error.response.data.message) || error.message;

    throw error
  }
)

export default _http;
