import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const setStoredUser = (user) => {
  window.localStorage.setItem(
    'loggedUser', JSON.stringify(user)
  )
}

const getStoredUser = () => {
  return JSON.parse(window.localStorage.getItem('loggedUser'))
}

const deleteStoredUser = () => {
  window.localStorage.removeItem('loggedUser')
}

export default { login, setStoredUser, getStoredUser, deleteStoredUser }