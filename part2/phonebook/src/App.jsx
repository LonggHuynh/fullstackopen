import Filter from './components/Filter'
import Notification from './components/Notification'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import { useEffect, useState } from 'react'
import { getPersons, addPerson, deletePerson, updatePerson, } from './services'

const App = () => {
  const [notification, setNotification] = useState(undefined);
  const [success, setSuccess] = useState(true);

  const notify = (msg, success) => {
    setNotification(msg);
    setSuccess(success);
    setTimeout(() => {
      setNotification(undefined);
    }, 5000);
  };


  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', number: '040-123456', id: 1 },
    // { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    // { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    // { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])



  const [val, setVal] = useState(false)

  const forceUpdate = () => setVal(prev => !prev)
  useEffect(() => {
    getPersons().then((data) => setPersons(data))
      .catch(err => console.log(err))

  }, [val])

  const [filteredPersons, setFilteredPersons] = useState(persons)


  const deleteOldPerson = (person) => {
    deletePerson(person.id)
      .then(() => forceUpdate())
      .then(() => notify(`${person.name} is  deleted`, true))
      .catch(_ => { notify('Person does not exists', false); forceUpdate() })
  }

  const addNewPerson = (person) => {
    addPerson(person)
      .then(() => forceUpdate())
      .then(() => notify(`${person.name} is  added`, true))
      .catch(err => console.log(err))

  }

  const updateOldPerson = (person) => {
    updatePerson(person)
      .then(() => forceUpdate())
      .then(() => notify(`${person.name} is  updated`, true))
      .catch(_ => { notify('Person does not exists', false); forceUpdate() })
  }

  return (
    <div>

      {notification && (
        <Notification message={notification} success={success} />
      )}
      <h2>Phonebook</h2>

      <Filter persons={persons} setPersons={setPersons} setFilteredPersons={setFilteredPersons} />

      <h3>Add a new</h3>

      <PersonForm persons={persons} addNewPerson={addNewPerson} updateOldPerson={updateOldPerson} />

      <h3>Numbers</h3>
      {
        filteredPersons.map(person => <Person key={person.id} person={person} deleteOldPerson={() => deleteOldPerson(person)} />)
      }
    </div>
  )
}


export default App