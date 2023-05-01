import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'


import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'

import NotificationContext from './NotificationContext'
import { useContext } from 'react'

const App = () => {


  const [notification, notificationDispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()
  const result = useQuery('anecdotes', getAnecdotes)


  const voteAnecdote = (anecdote) => {
    updateAnecdote(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({ type: 'SET_MESSAGE', payload: `anecdote '${anecdote.content}' voted` })

  }

  const voteMutation = useMutation(voteAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to server problems</div>
  }

  const anecdotes = result.data


  console.log(anecdotes)

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote)
  }



  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id} >
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
