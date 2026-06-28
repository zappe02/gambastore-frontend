import axios from 'axios';

const api = axios.create({
    // La dejamos vacía como la tenías para que respete tus rutas exactas (ej: /api/api/productos)
    baseURL: '', 
    withCredentials: false,
    headers: {
        // La llave maestra viaja acá para abrir la puerta del backend dev
        'x-vercel-protection-bypass': 'VyGgJPuCknk5KB1dRUf18eP0E26s94XT'
    }
});

export default api;