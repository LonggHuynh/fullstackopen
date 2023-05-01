import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateAnecdote = async (id, anecdote) => {
  console.log(anecdote)
  const response = await axios.put(`${baseUrl}/${id}`, anecdote)
  return response.data
}

export default { getAnecdotes, createNew, updateAnecdote }
