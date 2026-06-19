import axios from 'axios';

const api = axios.create({
    // Dejamos la baseURL vacía. Axios le va a pegar a http://localhost:5173/api/api/productos
    // Vite va a atajar eso y lo va a reenviar oculto a Vercel con el token.
    baseURL: '', 
    withCredentials: false 
});

export default api;