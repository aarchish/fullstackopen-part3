import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/persons`;
console.log("baseUrl", baseUrl)

const getAll = () => {
    const request = axios.get(baseUrl)
    console.log("getAll request", request)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, create, update, remove }