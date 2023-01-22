import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const getPhonebook = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request
}

const removeEntry = (id) => {
    const remove = axios.delete(`http://localhost:3001/persons/${id}`)
    return remove
}

const editEntry = (oldObj, newObj) => {
    const edit = axios.put(`http://localhost:3001/persons/${oldObj.id}`, newObj)
    return edit
}

export default { getPhonebook, create, removeEntry, editEntry }