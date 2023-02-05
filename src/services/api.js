import axios from 'axios'

const api = axios.create({
    baseURL: "https://localhost:7247",
})

export default api;