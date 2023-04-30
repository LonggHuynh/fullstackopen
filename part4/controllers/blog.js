
const router = require('express').Router()
const Blog = require('../models/blog')


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
    const user = request.user
    blog.user = user.id
    const newBlog = new Blog(blog)
    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)
  } catch (err) {
    next(err)
  }
})




router.put('/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    const updatedBlogData = request.body;
    updatedBlogData.user = updatedBlogData.user.id

    const blog = await Blog.findById(id);


    if (!blog) {
      return response.status(404).json({ error: 'Blog post not found' });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedBlogData, { new: true });
    response.json(updatedBlog);

  } catch (err) {
    next(err)
    console.log(err)
  }
})


router.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const { id } = request.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return response.status(404).json({ error: 'Blog post not found' });
    }


    if (blog.user != request.user.id) {
      return response.status(401).json({ error: 'Unauthorized: not your post' });
    }

    await Blog.findByIdAndDelete(id);
    response.status(204).end();

  } catch (err) {
    next(err);
  }
});


module.exports = router