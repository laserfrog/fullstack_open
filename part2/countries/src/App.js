import axios from "axios"
import { useEffect, useState } from "react"

const Search = ({ name, change }) => (
  <input name={name} onChange={change} />
)

const CountryNames = ({ name, onClick }) => (
  <ul>
    {name} <button onClick={onClick}>show</button>
  </ul>
)


const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState(null)

  const getJsonHook = () => {
    if (search) {
      axios.get(`https://restcountries.com/v3.1/name/${search}`)
        .then(response => {
          setCountries(response.data)
          console.log(response.data[0].name.common)
        })
        .catch(error => {
          setCountries(null)
          setSearch(null)
        })
    }

  }

  useEffect(getJsonHook, [search])

  const handleSearch = (event) => (
    setSearch(event.target.value)
  )

  if (!countries) {
    return (
      <>
        Countries
        <Search name={null} change={handleSearch} />
        <p>Please do a search</p>
      </>
    )
  }

  if (countries.length > 10) {
    return (
      <>
        Countries
        <Search name={''} change={handleSearch} />
        <p>Too many matches, specify another filer</p>
      </>
    )
  }

  if (countries.length === 1) {

    const languages = Object.values(countries[0].languages)
    const langy = languages.length > 1
    return (
      <>
        Countries
        <Search name={''} change={handleSearch} />
        <h1>{countries[0].name.official}</h1>
        <br></br>
        Capital City: {countries[0].capital}
        <p></p>Area: {countries[0].area}
        <h3>{langy ? 'languages' : 'language'}:</h3>
        {languages.map(lang => <li key={lang}>{lang}</li>)}
        <img src={countries[0].flags.png}></img>
      </>
    )
  }

  return (
    <>
      Countries
      <Search name={''} change={handleSearch} />
      {countries.map(country => (
        <CountryNames key={country.name.common} name={country.name.common} onClick={() => setSearch(country.name.official)} />))}
    </>
  )
}
export default App;
