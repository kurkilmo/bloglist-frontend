import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    addBlog(newBlog)
  }

  const change = (setter) => (({ target }) => setter(target.value))

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            data-testid='titlefield'
            type='text'
            value={title}
            name='Title'
            onChange={change(setTitle)}
          />
        </div>
        <div>
          author:
          <input
            data-testid='authorfield'
            type='text'
            value={author}
            name='Author'
            onChange={change(setAuthor)}
          />
        </div>
        <div>
          url:
          <input
            data-testid='urlfield'
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

export default BlogForm