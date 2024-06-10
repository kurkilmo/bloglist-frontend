import axios from 'axios'
const baseUrl = '/api/blogs'

let config = {
  headers: { Authorization: '' }
}
const setToken = (newToken) => {
  config.headers.Authorization = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (blog) => {
  const request = axios.post(baseUrl, blog, config)
  return request.then(res => res.data)
}

const update = (blog) => {
  const blogToSend = {
    ...blog,
    user: blog.user.id
  }
  const url = `${baseUrl}/${blog.id}`
  const request = axios.put(url, blogToSend, config)
  return request.then(res => res.data)
}

export default { getAll, setToken, create, update }