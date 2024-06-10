import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, update }) => {
  const [ expanded, setExpanded ] = useState(false)

  const handleLike = (event) => {
    event.preventDefault()
    blog.likes += 1
    blogService.update(blog).then(updated => {
      update(updated)
    })
  }

  const extraInfo = () => {
    if (!expanded) return null
    return (
      <div>
        <a href={blog.url}>{blog.url}</a> <br/>
        {blog.likes}
        <button onClick={handleLike}>like</button> <br />
        {blog.user.name} <br/>
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