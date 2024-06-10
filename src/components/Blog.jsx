import { useState } from 'react'

const Blog = ({ user, blog, like, remove }) => {
  const [ expanded, setExpanded ] = useState(false)

  const handleLike = (event) => {
    event.preventDefault()
    like(blog)
  }

  const handleDelete = (event) => {
    event.preventDefault()
    remove(blog)
  }

  const deleteButton = () => {
    if (user.username !== blog.user.username) return null
    return (
      <button onClick={handleDelete}>delete</button>
    )
  }

  const extraInfo = () => {
    if (!expanded) return null
    return (
      <div>
        <a href={blog.url}>{blog.url}</a> <br/>
        {blog.likes}
        <button onClick={handleLike}>like</button> <br />
        {blog.user.name} <br/>
        {deleteButton()}
      </div>
    )
  }

  const buttonText = expanded
    ? 'hide'
    : 'view'

  return (
    <div className='blog'>
      {blog.title} - {blog.author}
      <button onClick={() => setExpanded(!expanded)}>{buttonText}</button>
      {extraInfo()}
    </div>
  )
}

export default Blog