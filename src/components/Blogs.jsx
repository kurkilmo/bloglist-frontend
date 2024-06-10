import { useState, useEffect, useRef } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

import blogService from '../services/blogs'
import loginService from '../services/login'

const Blogs = ({ user, setUser, notify }) => {
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const updateBlogs = (updatedBlog) => {
    setBlogs(blogs.map(b => b.id === updatedBlog.id
      ? { ...updatedBlog, user }
      : b))
  }

  const addBlog = (newBlog) => {
    blogService.create(newBlog).then(createdBlog => {
      setBlogs(blogs.concat({
        ...createdBlog,
        user
      }))
      blogFormRef.current.toggleVisibility()

      const author = createdBlog.author
        ? ` by ${createdBlog.author}`
        : ''
      const msg =
        `A new blog "${createdBlog.title}"${author} added`
      notify(msg, 'green')
    }).catch(error => {
      const response = error.response.data.error || 'Error posting blog'
      let msg = 'Error posting blog'
      if (response.includes('url')) msg = 'Please provide blog url'
      if (response.includes('title')) msg = 'Please provide blog title'
      notify(msg, 'red')
    })
  }

  const logout = () => {
    setUser(null)
    loginService.deleteStoredUser()
  }

  const sortedBlogs = blogs.sort((a, b) => (b.likes - a.likes))

  return (
    <div>
      <div className='userInfo'>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
        <BlogForm addBlog={addBlog}/>
      </Togglable>
      <ul>
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} update={updateBlogs} />
        )}
      </ul>
    </div>
  )
}

export default Blogs