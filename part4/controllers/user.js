const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body
    if (password.length < 3) {
      throw new Error("Password length is less than 3.")
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (err) {
    next(err)
  }
})


router.get('/', async (request, response, next) => {


  try {
    const users = await User.find({}).populate('blogs')
    response.json(users)
  } catch (err) {
    next(err)
  }
})

module.exports = router