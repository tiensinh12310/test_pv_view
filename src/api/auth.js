import axios from '../utils/axios'

export default {
  login: async function(post) {
    return await axios.post('/auth/login', post)
  },
  logout: async function(post) {
    return await axios.post('/auth/logout', post)
  },
  refreshToken: async function(post){
    return await axios.post('/auth/refresh-token', post)
  }
}
