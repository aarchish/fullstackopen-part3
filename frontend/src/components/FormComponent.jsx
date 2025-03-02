import React from 'react'
import personsservice from '../services/personsservice'

const Form = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber, handleNotification }) => {

  const handleFormSubmit = (event) => {
    event.preventDefault()
    console.log("input name is:", newName)
    console.log("persons are:", persons)

    const personObject = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      const existingId = existingPerson.id
      if( window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsservice
        .update(existingId, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingId ? person : returnedPerson))
          handleNotification(`Updated ${newName}`, 'success')
        })
        .catch(error => {
          if(error.response.status === 404) {
            handleNotification(`Information of ${newName} has already been removed from the server`, 'error')
            setPersons(persons.filter(person => person.id !== existingId))
          }
          else {
            handleNotification(`Error updating ${newName}`, 'error')
          }
        })
      }
      return
    }

    personsservice.create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      handleNotification(`Added ${newName}`, 'success')
    })
    .catch(error => {
      console.error('Error adding person:', error)
      handleNotification(error.response.data.error, 'error')
    })

    setNewName('')
    setNewNumber('')

  }

  const handlePersonsChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <>
      <div>
        <h2>add a new Person</h2>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div>
          name:
          <input value={newName} onChange={handlePersonsChange}/>
        </div>
        <div>
          number:
          <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default Form