import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUser = loginService.getStoredUser()
    if (loggedUser) {
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const display = () => (
    user === null
      ? <Login setUser={ setUser } />
      : <Blogs user={user} setUser={setUser} />
  )
  return (
    <div>
      { display() }
    </div>
  )
}

export default App