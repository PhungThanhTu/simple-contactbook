import axios from 'axios'
import { API_BASE_URL } from '../config/index'

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'content-type': 'application/json',
    }
})

export default axiosClient