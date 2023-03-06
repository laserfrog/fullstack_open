import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('error')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('hui')
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessageType('success')
      setMessage(`${user.name} you have logged in successfully`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessageType('error')
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleBlogPost = async (event) => {
    event.preventDefault()
    const newBlog = {
      "title": title,
      "author": author,
      "url": url,
      "likes": 0
    }

    const returnedBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(returnedBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
    setMessageType('success')
    setMessage(` the blog ${returnedBlog.title} by ${returnedBlog.author} has been added.`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }




  if (user == null) {
    return (
      <div>
        <Message sentMessage={message} type={messageType} />
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input type="text" value={username} name="Username" onChange={(event) => setUsername(event.target.value)} />
          </div>
          <div>
            Password
            <input type="password" value={password} name="Password" onChange={(event) => setPassword(event.target.value)} />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>)
  }
  return (
    <div>
      <Message sentMessage={message} type={messageType} />
      <p>Welcome back {user.username}</p>
      <button onClick={() => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
      }}>log out</button>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <h2>Create new</h2>
      <form onSubmit={handleBlogPost}>
        <div>
          title:
          <input type="text" value={title} name="Title" onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div>
          author:
          <input type="text" value={author} name="Author" onChange={(event) => setAuthor(event.target.value)} />
        </div>
        <div>
          url:
          <input type="text" value={url} name="Url" onChange={(event) => setUrl(event.target.value)} />
        </div>
        <button type='submit'>add blog</button>
      </form>
    </div>
  )
}

export default App