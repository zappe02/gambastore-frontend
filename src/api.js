import axios from 'axios';

const api = axios.create({
    // Apuntamos a la URL de preview de la rama dev
    baseURL: 'https://gamba-store-cjpm-git-dev-skarkloffs-projects.vercel.app/api/api', 
    withCredentials: false, // No enviamos cookies ni credenciales
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default api;