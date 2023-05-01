import { createNew } from '../requests';
import { useMutation, useQueryClient } from 'react-query';



const AnecdoteForm = () => {

  const queryClient = useQueryClient()


  const addAnecdote = async (content) => {
    await createNew(content)
  }
  const newAnecdote = useMutation(addAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length >= 5) {
      newAnecdote.mutateAsync(content);
      event.target.anecdote.value = '';
      console.log('new anecdote');
    } else {
      console.log('anecdote content should be at least 5 characters long');
    }
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
