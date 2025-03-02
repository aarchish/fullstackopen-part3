import React from 'react'

const Filter = ({persons, searchTerm, setSearchTerm, setSearchResults}) => {
    
    const handleSearchChange = (event) => {
        const searchTerm = event.target.value
        setSearchTerm(searchTerm)
        const results = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setSearchResults(results)
    }
    
    return (
        <div>
        filter shown with <input value={searchTerm} onChange={handleSearchChange}/>
        </div>
    )
}

export default Filter
