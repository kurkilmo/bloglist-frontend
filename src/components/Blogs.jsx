import { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import loginService from '../services/login'

const AddBlog = ({ addBlog, notify }) => {
  const [title, setTitle] = useState('ti')
  const [author, setAuthor] = useState('au')
  const [url, setUrl] = useState('ur')

  const handleCreate = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    blogService.create(newBlog).then(result => {
      addBlog(result)
      const auth = result.author
        ? ` by ${result.author}`
        : ''
      const msg =
        `A new blog "${result.title}"${auth} added`
      notify(msg, 'green')
    }).catch(error => {
      const response = error.response.data.error || 'Error posting blog'
      let msg = 'Error posting blog'
      if (response.includes('url')) msg = 'Please provide blog url'
      if (response.includes('title')) msg = 'Please provide blog title'
      notify(msg, 'red')
    })
  }

  const change = (setter) => (({ target }) => setter(target.value))

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            type='text'
            value={title}
            name='Title'
            onChange={change(setTitle)}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='Author'
            onChange={change(setAuthor)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            name='Url'
            onChange={change(setUrl)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const Blogs = ({ user, setUser, notify }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const addBlog = (blog) => setBlogs(blogs.concat(blog))

  const logout = () => {
    setUser(null)
    loginService.deleteStoredUser()
  }

  return (
    <div>
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <AddBlog addBlog={addBlog} notify={notify} />
      <ul>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </ul>
    </div>
  )
}

export default Blogs