import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ author, title, url })

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          <label htmlFor='title'> title</label>
          <input
            id='title'
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor='author'> author</label>
          <input
            id='author'
            value={author}
            onChange={event => setAuthor(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor='url'> url</label>
          <input
            id='url'
            value={url}
            onChange={event => setUrl(event.target.value)}
          />
        </div>
        <button id='save' type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm