import axios from "axios";

const baseURL = 'http://localhost:6800'

export default axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": 'application/json',
        "Authorization": 'loremipsumdolorsitamet'
    },
    withCredentials: true
})