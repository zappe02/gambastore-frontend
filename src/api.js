import axios from 'axios';

// Apuntamos al puerto 8000 que es donde expone tu Docker de Laravel
const api = axios.create({
    baseURL: 'http://localhost:8000/api', 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default api;