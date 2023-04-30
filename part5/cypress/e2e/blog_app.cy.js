const user = {
  name: 'Long',
  username: 'Longg',
  password: 'password'
}

const newUser = {
  name: 'Not Long',
  username: 'notLong',
  password: 'Longsbirthday'
}

const blog = {
  title: 'Long is the author',
  author: 'Long',
  url: 'http://lol.com'
}

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/users', newUser)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('log in').click()

      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.contains('login').click()

      cy.contains(`${user.name} logged in`)
    })

    it('fails with wrong credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type(user.username)
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.contains('log in').click()
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.contains('login').click()

      cy.contains(`${user.name} logged in`)
    })

    it('Users can create a blog', function () {
      cy.contains('Add new blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#save').click()

      cy.contains(blog.title)
      cy.contains(blog.author)
    })

    it('Users can like a blog', function () {
      cy.contains('Add new blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#save').click()

      cy.contains('View').click()
      cy.contains('Like').click()
      cy.contains('Like').click()

      cy.contains('likes: 2')
    })

    it('Creators can delete their blogs', function () {
      cy.contains('Add new blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#save').click()

      cy.contains('View').click()
      cy.contains('Remove').click()

      cy.contains(blog.title).should('not.exist')
    })

    it('Only the creator can see the delete button of a blog', function () {

      cy.contains('Add new blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#save').click()

      cy.contains('View').click()
      cy.contains('Remove')
      cy.contains('Log out').click()
      cy.login({ username: newUser.username, password: newUser.password })
      cy.contains(blog.title).parent().parent().as('newUserBlog')
      cy.get('@newUserBlog').contains('View').click()
      cy.contains('Remove').should('not.exist')
    })



    it('Blogs are ordered by likes', function () {
      const blogs = [
        { title: 'First title', author: 'Long01', url: 'http://lol.com', likes: 5 },
        { title: 'Second', author: 'Long02', url: 'http://lol1.com', likes: 10 },
        { title: 'Last ', author: 'Long03 ', url: 'http://lol2.com', likes: 7 },
      ]

      blogs.forEach(blog => {
        cy.contains('Add new blog').click()
        cy.get('#title').type(blog.title)
        cy.get('#author').type(blog.author)
        cy.get('#url').type(blog.url)
        cy.get('#save').click()
      })

      blogs.forEach((blog) => {
        cy.contains(blog.title).parent().as('selectedBlog')
        cy.get('@selectedBlog').contains('View').click()
        for (let i = 0; i < blog.likes; i++) {

          cy.contains('Like').click()
          cy.wait(1000)

        }
        cy.contains('Hide').click()

      })

      const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

      cy.get('.blog').should('have.length', blogs.length)
      cy.get('.blog').each((blogContainer, index) => {
        cy.wrap(blogContainer).should('contain', sortedBlogs[index].author)
      })
    })

  })


})
