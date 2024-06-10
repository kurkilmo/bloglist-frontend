import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'

const App = () => {
  const [user, setUser] = useState(null)

  const display = () => (
    user === null
      ? <Login setUser={ setUser } />
      : <Blogs user={ user } />
  )
  return (
    <div>
      { display() }
    </div>
  )
}

export default App