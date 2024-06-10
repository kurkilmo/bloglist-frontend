import { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import loginService from '../services/login'


const Blogs = ({ user, setUser }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const logout = () => {
    setUser(null)
    loginService.deleteStoredUser()
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <ul>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </ul>
    </div>
  )
}

export default Blogs