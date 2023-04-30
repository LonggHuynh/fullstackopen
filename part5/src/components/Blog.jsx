import { useState } from 'react'

const Blog = ({ blog, remove, addLike, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetails, setShowDetails] = useState(false)
  const toggleDetails = () => setShowDetails(prev => !prev)
  return (
    <div className='blog' style={blogStyle}>
      <div>
        <span className='blog-title'>
          {blog.title} </span>
        written by
        <span className='blog-author'>
          {blog.author}
        </span>
        <button onClick={toggleDetails}> {showDetails ? 'Hide' : 'View'}</button>
      </div>
      {
        showDetails &&
        <div>
          <a className='blog-url' href='{blog.url}'> {blog.url} </a>
          <p className='blog-likes'> likes: {blog.likes} <button onClick={addLike}>Like</button> </p>
          <p>{blog.user.name}</p>
          {blog.user.id === (user ? user.id : null) && <button onClick={remove}>Remove</button>}
        </div>
      }
    </div>
  )
}

export default Blog