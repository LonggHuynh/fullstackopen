import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blog'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])


  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)


    }
  }, [])


  const notify = (message, success) => {

    setMessage(message)
    setSuccess(success)
    setTimeout(() => {
      setMessage(null)

    }, 5000)

  }
  const blogFormRef = useRef()
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      notify('Logged in', true)
    } catch (exception) {
      notify('wrong username or password', false)
    }
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        returnedBlog = { ...returnedBlog, user }
        setBlogs(prev => [...prev, returnedBlog])
        blogFormRef.current.toggleVisibility()
      })
      .then(() => {
        notify(`A new blog ${blogObject.title}  by ${blogObject.author} is added`, true)

      })
      .catch(err => {

        notify(err.response.data.error, false)
      })

  }

  const removeBlog = (blogObject) => {
    const id = blogObject.id

    const confirmRemove = window.confirm(`Do you want to remove the blog "${blogObject.title}" by ${blogObject.author}?`)

    if (confirmRemove) {
      blogService.remove(id)
        .then(() => {
          notify(`The blog ${blogObject.title} by ${blogObject.author} is removed`, true)
          setBlogs(prev => prev.filter(blog => blog !== blogObject))
        })
        .catch(err => {
          notify(err.response.data.error, false)
        })
    }
  }

  const addLike = async (blogObject) => {
    const id = blogObject.id

    const updatedBlog = { ...blogObject, likes: blogObject.likes + 1 }

    try {

      setBlogs(prev => prev.map(blog => blog.id === id ? updatedBlog : blog))
      notify(`The number of likes for the blog ${updatedBlog.title} by ${updatedBlog.author} has been updated`, true)
    } catch (err) {
      notify(err.response.data.error, false)
    }
  }




  return (
    <div>
      <h1>Blogs app</h1>
      <Notification message={message} success={success} />

      {!user &&
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>

      }
      {user &&
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>Log out</button></p>
          <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      }



      <ul>
        {blogs.sort((a, b) => (b.likes - a.likes)).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            remove={() => removeBlog(blog)}
            addLike={() => addLike(blog)}
          />
        )}
      </ul>

    </div>
  )
}

export default App
