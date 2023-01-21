import { useEffect, useState } from 'react'
import PhoneBookService from './services/phonebook'

const ShowName = ({ name, number }) => (
  <>
    <li>{name}: {number}</li>
  </>
)

const Search = (props) => (
  <>
    Search <input value={props.newSearch} onChange={props.handleSearchInput} />
  </>
)

const PeopleForm = (props) => (
  <>
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameInput} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberInput} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const getJsonDataHook = () => {
    // axios
    //   .get('http://localhost:3001/persons')
    //   .then(response => {
    //     setPersons(response.data)
    //   })
    PhoneBookService.getPhonebook()
      .then(response => {
        setPersons(response)
      })
  }

  useEffect(getJsonDataHook, [])

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchInput = (event) => {
    setNewSearch(event.target.value)
  }

  const addNameNumber = (event) => {
    event.preventDefault()
    const nameObject = { name: newName, number: newNumber, id: persons.length + 1 }
    if (persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      // axios
      //   .post('http://localhost:3001/persons', nameObject)
      //   .then(response => {
      //     setPersons(persons.concat(nameObject))
      //     setNewName('')
      //     setNewNumber('')
      PhoneBookService.create(nameObject)
        .then(response => {
          setPersons(persons.concat(nameObject))
          setNewName('')
          setNewNumber('')
        })


    }
  }

  const showPeople = newSearch
    ? persons.filter(person => person.name.toLowerCase() === newSearch.toLowerCase()) : persons

  return (
    <div>
      <Search newSearch={newSearch} handleSearchInput={handleSearchInput} />
      <h2>Phonebook</h2>
      <PeopleForm onSubmit={addNameNumber} newName={newName}
        handleNameInput={handleNameInput} newNumber={newNumber} handleNumberInput={handleNumberInput} />
      <h2>Numbers</h2>
      {showPeople.map(person =>
        <ShowName key={person.name} name={person.name} number={person.number}></ShowName>)}

    </div>
  )
}

export default App