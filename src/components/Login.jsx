import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import axios from 'axios'

const Error = ({ message }) => {
  if (message === '') return null
  return (
    <div className="error">
      {message}
    </div>
  )
}

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const configUser = (user) => {
    window.localStorage.setItem(
      'loggedNoteappUser', JSON.stringify(user)
    ) 
    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password})
      configUser(user)
    } catch (error) {
      const message = error.response.data.error || 'Error logging in'
      setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage('')
      }, 2500)
    }
  }

  return (
    <div className='login'>
      <h2>login to application</h2>
      <Error message={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login