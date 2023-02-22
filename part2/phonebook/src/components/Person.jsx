import React from 'react'

const Person = ({ person, deleteOldPerson }) => {
    return (
        <div>{person.name} {person.number} <button onClick={deleteOldPerson}>Delete</button></div>
    )
}

export default Person