import { useState } from "react";

const PersonForm = ({ persons, addNewPerson, updateOldPerson }) => {

  const [name, setName] = useState("")
  const [number, setNumber] = useState("")


  const handleAdd = (e) => {
    e.preventDefault()


    const personInDb = persons.find(person => person.name === name)
    if (persons.find(person => person.name === name)) {
      if (window.confirm(`${name} already added. Do you want to update?`)) {


        updateOldPerson({ ...personInDb, number })
      }
      return
    }
    else
      addNewPerson({ name, number, id: persons.length + 1 })

  }
  return (
    <form onSubmit={handleAdd}>
      <div>
        name: <input value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        number: <input value={number} onChange={e => setNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
