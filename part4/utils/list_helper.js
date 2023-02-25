
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs
    .map(blog => blog.likes)
    .reduce((sum, item) => sum + item, 0);
};

const favoriteBlog = (blogs) => {
  let favoriteBlog = { likes: 0 };

  blogs.forEach((blog) => {
    if (blog.likes > favoriteBlog.likes) {
      favoriteBlog = blog;
    }
  });
  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes,
  };
};

const mostBlogs = (blogs) => {
  const countMap = new Map()
  blogs.forEach(blog => {
    if (!countMap.get(blog.author))
      countMap.set(blog.author, 0)
    countMap.set(blog.author, countMap.get(blog.author) + 1)
  })


  let authorWithMostBlogs = null
  let maxBlogCount = 0
  countMap.forEach((blogCount, author) => {
    if (maxBlogCount < blogCount) {
      authorWithMostBlogs = author
      maxBlogCount = blogCount
    }
  })

  return {
    author: JSON.parse(JSON.stringify(authorWithMostBlogs)),
    blogs: maxBlogCount
  }
}

const mostLikes = (blogs) => {
  const countMap = new Map()
  blogs.forEach(blog => {
    if (!countMap.get(blog.author))
      countMap.set(blog.author, 0)
    countMap.set(blog.author, countMap.get(blog.author) + blog.likes)
  })


  let authorWithMostLikes = null
  let maxBlogCount = 0
  countMap.forEach((blogCount, author) => {
    if (maxBlogCount < blogCount) {
      authorWithMostLikes = author
      maxBlogCount = blogCount
    }
  })

  return {
    author: JSON.parse(JSON.stringify(authorWithMostLikes)),
    likes: maxBlogCount
  }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
