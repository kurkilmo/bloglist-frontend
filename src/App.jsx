import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message }) => {
  if (message === null) return
  const notificationStyle = {
    color: `${message[1]}`
  }
  return (
    <div className="notification" style={notificationStyle}>
      {message[0]}
    </div>
  )
}

const App = () => {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const loggedUser = loginService.getStoredUser()
    if (loggedUser) {
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const notify = (text, color) => {
    setNotification([text, color])
    setTimeout(() => {
      setNotification(null)
    }, 3500)
  }

  const headerText = user === null
    ? 'login to application'
    : 'blogs'

  const display = () => (
    user === null
      ? <Login setUser={setUser} notify={notify} />
      : <Blogs user={user} setUser={setUser} notify={notify} />
  )
  return (
    <div>
      <h1>{headerText}</h1>
      <Notification message={notification} />
      { display() }
    </div>
  )
}

export default App