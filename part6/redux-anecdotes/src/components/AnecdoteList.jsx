import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateVoteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()



    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)


    console.log(anecdotes)


    const filteredAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes).filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )



    const vote = (anecdote) => {
        dispatch(updateVoteAnecdote(anecdote.id))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }
    return (
        <>
            <h2>Anecdotes</h2>
            {filteredAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList