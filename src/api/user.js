import axios from '../utils/axios'

export default {
  getLoginUserProfile: async function(query) {
    return await axios.get('/users/profile', query)
  },
  getList: async function(query) {
    return await axios.get('/users', {params: query})
  },
  update: async function(post) {
    return await axios.put('/users', post)
  },
  create: async function(post) {
    return await axios.post('/users', post)
  },
  validateEmail: async function(post) {
    return await axios.post('/users/validate-email', post)
  }
}
