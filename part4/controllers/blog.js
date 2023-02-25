
const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
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


router.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)
    await blog.save()
    response.status(201).json(blog)
  } catch (err) {
    next(err)
  }
})


router.delete('/:id', async (request, response, next) => {
  try {
    const { id } = request.params
    const blog = await Blog.findByIdAndDelete(id)

    if (!blog)
      return response.status(404).json({ msg: "Not found" })
    response.status(204).end()
  } catch (err) {
    next(err)
  }
})


module.exports = router