import React from "react";
import personsservice from "../services/personsservice";

const Numbers = ({ persons, setPersons, handleNotification }) => {
  console.log("persons", persons);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      personsservice.remove(id).then(() => {
        const removedPerson = persons.find(person => person.id === id);
        console.log(`Deleted ${removedPerson.name}`, 'success')
        setPersons(persons.filter(person => person.id !== id))
        handleNotification(`Deleted ${removedPerson.name}`, 'success')
      }).catch(error => {
        const removedPerson = persons.find(person => person.id === id);
        console.error(`Error deleting ${removedPerson.name}`, error);
        handleNotification(`Error deleting ${removedPerson.name}`, 'error')
      });
    }
  }
  
  return (
    <table>
      <tbody>
        {persons.map(person =>
          <tr key={person.id}>
            <td>{person.name}</td> 
            <td>{person.number}</td>
            <td><button onClick={() => handleDelete(person.id)}>Delete</button></td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default Numbers;