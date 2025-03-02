import { useEffect, useState, useCallback } from 'react'
import Form from './components/FormComponent'
import Numbers from './components/NumbersComponent'
import Filter from './components/FilterComponent'
import personsservice from './services/personsservice'
import Notification from './components/NotificationComponent'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [notification, setNotification] = useState({ message: '', type: '' })

  // Fetch data from the server only once when the component mounts
  useEffect(() => {
    personsservice.getAll().then(initialPersons => {
      setPersons(initialPersons)
      setSearchResults(initialPersons) // Initialize searchResults with the fetched data
    })
  }, [])

  console.log('Main App Component: persons', persons)
  
  // Update searchResults whenever persons state changes
  useEffect(() => {setSearchResults(persons)}, [persons])

  // Clear notification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
        setNotification({ message: '', type: '' })
      }
      , 5000)
      return () => clearTimeout(timer)
    }, 
  [notification])

  const handleNotification = useCallback((message, type) => {
    setNotification({ message, type })
  }, [])
  
  return (
    <div>
      <h2>Phonebook</h2>
      {notification.message && <Notification notification={notification} />}
      <Filter 
        persons={persons} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        setSearchResults={setSearchResults} 
      />
      <Form 
        persons={persons} 
        setPersons={setPersons} 
        newName={newName} 
        setNewName={setNewName} 
        newNumber={newNumber} 
        setNewNumber={setNewNumber}
        handleNotification={handleNotification}
      />
      <h2>Numbers</h2>
      <Numbers 
        persons={searchResults} 
        setPersons={setPersons}
        handleNotification={handleNotification}
      />
    </div>
  )
}





export default App