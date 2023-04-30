import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()


    const  anecdotes = useSelector(state => state.anecdotes)
    const  filter = useSelector(state => state.filter)



    const filteredAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes).filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )

    

    const vote = (id) => {
        dispatch(voteAnecdote(id))
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
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList