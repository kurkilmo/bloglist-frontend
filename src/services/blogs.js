import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (blog) => {
  const headers = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseUrl, blog, headers)
  return request.then(res => res.data)
}

export default { getAll, setToken, create }