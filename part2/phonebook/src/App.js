import axios from 'axios'
import { useEffect, useState } from 'react'
import PhoneBookService from './services/phonebook'

const ShowName = ({ name, number, buttonClick }) => (
  <>
    <li>{name}: {number} <button key={number} onClick={buttonClick}>delete</button> </li>
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
      if (window.confirm(`${newName} is already in the phonebook do you want to update the phone number?`)) {
        const oldObject = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        const newObject = { ...oldObject, number: newNumber }
        // axios.put(`http://localhost:3001/persons/${oldObject.id}`, newObject)
        PhoneBookService.editEntry(oldObject, newObject)
          .then(response => {
            alert('phone number updated')
            console.log(response.data)
            setPersons(persons.map(person => person.id !== response.data.id ? person : response.data))

          })
      }
      // alert(`${newName} is already added to the phonebook`)
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

  const deleteNameNumber = (id) => {
    console.log(id)
    if (window.confirm("Do you want to delete this entry?")) {
      // axios.delete(`http://localhost:3001/persons/${id}`)
      PhoneBookService.removeEntry(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
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

      {showPeople.map(person => (

        <ShowName key={person.name} name={person.name} number={person.number} buttonClick={() => deleteNameNumber(person.id)}>
        </ShowName>

      ))}

    </div>
  )
}

export default App