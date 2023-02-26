
const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')
router.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (request, response, next) => {
  try {
    const { id } = request.params
    const blog = await Blog.findById(id)
    if (!blog)
      return response.status(404).json({ msg: "Not found" })
    response.json(blog)
  } catch (err) {
    next(err)
  }
})


router.post('/', middleware.userExtractor, async (request, response, next) => {
  try {
    const blog = request.body
    blog.user = request.user.id
    const newBlog = new Blog(blog)
    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)
  } catch (err) {
    next(err)
  }
})




router.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const { id } = request.params
    if (id !== request.user.id) {
      return response.status(401).json({ error: "Not your post :)" })
    }
    const blog = await Blog.findByIdAndDelete(id)
    if (!blog)
      return response.status(404).json({ error: "Not found" })
    response.status(204).end()
  } catch (err) {
    next(err)
  }
})


router.put('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const { id } = request.params
    const updatedBlog = request.body
    if (id !== request.user.id) {
      return response.status(401).json({ error: "Not your post :)" })
    }
    const blog = await Blog.findOneAndReplace(id, updatedBlog)
    if (!blog)
      return response.status(404).json({ error: "Not found" })
    response.status(204).end()
  } catch (err) {
    next(err)
  }
})


module.exports = router