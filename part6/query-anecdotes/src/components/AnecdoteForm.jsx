import { createNew } from '../requests'
import { useMutation, useQueryClient } from 'react-query'

import NotificationContext from '../NotificationContext'
import { useContext } from 'react'

const AnecdoteForm = () => {

  const [notification, notificationDispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()


  const addAnecdote = async (content) => {
    await createNew(content)
  }
  const newAnecdote = useMutation(addAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: () => {
      notificationDispatch({ type: 'SET_MESSAGE', payload: 'too short anecdote, must have length 5 or more' })
    }
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdote.mutateAsync(content)
    event.target.anecdote.value = ''
    notificationDispatch({ type: 'SET_MESSAGE', payload: `anecdote '${content}' created` })

  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
