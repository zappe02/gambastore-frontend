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

// Interceptor de respuesta para manejar errores de forma centralizada
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const status = error.response.status;
            if (status === 401) {
                console.warn("No autorizado (401): Limpiando credenciales y redirigiendo...");
                // Aquí se podría limpiar el token de sesión si existiese
            } else if (status === 429) {
                console.error("Límite de peticiones excedido (429).");
                alert("Has realizado demasiadas solicitudes en poco tiempo. Por favor, aguardá unos instantes e intentá nuevamente.");
            } else if (status >= 500) {
                console.error(`Error de servidor (${status}):`, error.response.data);
                alert("Ocurrió un error interno en el servidor. Por favor, intentá de nuevo más tarde.");
            }
        }
        return Promise.reject(error);
    }
);

export default api;