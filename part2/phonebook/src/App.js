
import { useEffect, useState } from 'react'
import Message from './components/Message'
import PhoneBookService from './services/phonebook'
import './index.css'

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
  const [errorMessage, setErrorMessage] = useState({ message: null, type: 'success' })

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
            setErrorMessage({ message: "Phone number updated", type: "success" })
            console.log(response.data)
            setPersons(persons.map(person => person.id !== response.data.id ? person : response.data))
            setTimeout(() => { setErrorMessage({ ...errorMessage, message: null }) }, 3000)
          })
          .catch(error => {
            setErrorMessage({ message: `Information of ${nameObject.name} has already been removed from sever`, type: "error" })
            setTimeout(() => { setErrorMessage({ ...errorMessage, message: null }) }, 3000)
            setPersons(persons.filter(person => person.name !== nameObject.name))
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
          setErrorMessage({ message: "Added to phonebook", type: "success" })
          setNewName('')
          setNewNumber('')
          setTimeout(() => { setErrorMessage({ ...errorMessage, message: null }) }, 3000)
        })
        .catch(error => {
          // setErrorMessage({ message: error, type: "error" })
          if (error.response) {
            console.log(error.response.data)
            setErrorMessage({ message: error.response.data, type: "error" })
            setTimeout(() => { setErrorMessage({ ...errorMessage, message: null }) }, 3000)
          }

        })

    }
  }

  const deleteNameNumber = (id) => {
    console.log(id)
    if (window.confirm("Do you want to delete this entry?")) {
      // axios.delete(`http://localhost:3001/persons/${id}`)
      PhoneBookService.removeEntry(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          setErrorMessage({ message: "Contact deleted", type: "error" })
          setTimeout(() => { setErrorMessage({ ...errorMessage, message: null }) }, 3000)
        })
    }

  }

  const showPeople = newSearch
    ? persons.filter(person => person.name.toLowerCase() === newSearch.toLowerCase()) : persons

  return (
    <div>
      <Message message={errorMessage.message} type={errorMessage.type}></Message>
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