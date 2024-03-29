import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]



const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote: (state, action) => {
      state.push(asObject(action.payload))
    },
    voteAnecdote: (state, action) => {
      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      anecdoteToChange.votes++
    },
    setAnecdotes: (state, action) => action.payload
  }
})

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAnecdotes()
    dispatch(setAnecdotes(anecdotes))
  }
}


export const appendAnecdote = (content) => {
  return async dispatch => {
    await anecdoteService.createNew(content)
    dispatch(createAnecdote(content))
  }
}



export const updateVoteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdoteToVote = getState().anecdotes.find(a => a.id === id)
    const votedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1,
    }

    await anecdoteService.updateAnecdote(id, votedAnecdote)
    dispatch(voteAnecdote(id))
  }
}

export default anecdoteSlice.reducer
