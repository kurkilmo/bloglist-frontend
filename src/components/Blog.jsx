import { useState } from 'react'

const Blog = ({ blog }) => {
  const [ expanded, setExpanded] = useState(false)

  const handleLike = (event) => {
    event.preventDefault()
    console.log(`Liked ${blog.title}`)
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