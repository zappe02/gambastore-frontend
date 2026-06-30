# Gamba Store - Cliente Frontend

**Gamba Store** es una aplicación web responsiva e interactiva (Single Page Application - SPA) para la compra y gestión de calzado deportivo (botines de fútbol). Diseñada para ofrecer una experiencia arcade premium y moderna, se conecta con un backend en Laravel para la persistencia y utiliza Mercado Pago como pasarela para transacciones seguras.

Este repositorio corresponde al cliente frontend, desarrollado en el marco de la materia **Aplicaciones Web**.

---

## 🌟 Características Principales

*   **Catálogo Interactivo**: Listado dinámico de botines con filtros avanzados por marcas y categorías.
*   **Detalle del Producto**: Ficha técnica de cada calzado, selección de talle en base al stock disponible y animación de carga al carrito.
*   **Gestión de Carrito**: Control de productos seleccionados, cálculo de totales en tiempo real y flujo de checkout fluido.
*   **Integración con Mercado Pago**: Generación automática de preferencias y redirección segura para completar pagos.
*   **Sección de Terminal y Seguimiento (Cuenta)**: Consulta de historial de compras previas realizadas en el dispositivo y rastreo de envíos mediante códigos de tracking (`GAMBA-XXXXXX`).
*   **Diseño Arcade Responsivo (Retro-Moderno)**: Estilos temáticos premium con soporte Mobile-First, tipografía digital y transiciones interactivas.

---

## 🛠️ Stack Tecnológico

La aplicación está construida sobre tecnologías modernas optimizadas para rendimiento y mantenibilidad:

*   **React 19**: Biblioteca principal para la gestión de vistas reactivas y componentes modulares basados en Hooks.
*   **Vite 8**: Servidor de desarrollo ultrarrápido y empaquetador optimizado en producción (Rollup).
*   **CSS Modules**: Modularización estricta de hojas de estilo por componente para evitar colisiones globales.
*   **Axios**: Cliente HTTP con interceptores centralizados para inyección de cabeceras y control unificado de errores (`401`, `429`, `500+`).
*   **Mercado Pago API**: Integración asíncrona mediante la recepción del `init_point` del backend.
*   **Vercel Hosting**: Configuración nativa (`vercel.json`) con reglas de reescritura SPA para evitar errores de ruta 404 al redireccionar.

---

## 📂 Estructura del Código

El código fuente principal se organiza dentro del directorio `/src`:

*   `src/main.jsx` & `src/App.jsx`: Puntos de entrada de la aplicación y controladores principales del estado global de navegación, carrito y catálogo.
*   `src/components/`: Componentes estructurales y globales reutilizables.
    *   `Layout.jsx`: Contenedor principal con header de estado y footer.
    *   `BottomNav.jsx`: Barra de navegación inferior persistente con indicador del carrito.
    *   `WelcomeScreen.jsx`: Splash screen de carga inicial interactivo.
*   `src/pages/`: Páginas de la aplicación que representan las vistas del usuario.
    *   `Catalogo.jsx`: Catálogo con filtros y grilla de calzado.
    *   `DetalleProducto.jsx`: Vista detallada y ficha técnica del producto.
    *   `Carrito.jsx`: Resumen del carrito y totales.
    *   `Checkout.jsx`: Formulario de envío y pasarela de pago.
    *   `Cuenta.jsx`: Terminal de seguimiento de órdenes e historial.
    *   `Exito.jsx`: Landing de confirmación post-pago.
*   `src/services/`: Capas de integración y datos.
    *   `api.js`: Cliente Axios unificado e interceptores de red.
    *   `productos.mock.js`: Datos locales para simular el catálogo en entornos locales o sin conexión.

---

## 🚀 Instalación y Ejecución Local

Seguí estos pasos para clonar el repositorio, instalar dependencias e iniciar el entorno de desarrollo:

### Requisitos Previos

*   **Node.js** (Versión 18 o superior recomendada)
*   **npm** (incluido por defecto con Node.js)

### Paso 1: Clonar el proyecto e ingresar al directorio
```bash
git clone https://github.com/zappe02/gambastore-frontend.git
cd gambastore-frontend
```

### Paso 2: Instalar las dependencias
```bash
npm install
```

### Paso 3: Configurar el Servidor del Backend (Proxy)
Asegurate de que las solicitudes redirigidas por la ruta `/api` estén apuntando al endpoint de tu servidor Laravel en desarrollo. Podés ajustar esto en el archivo `vite.config.js` y `vercel.json` según tu infraestructura.

### Paso 4: Iniciar el servidor local de desarrollo
```bash
npm run dev
```
La terminal indicará la URL local (usualmente `http://localhost:5173`) donde podés abrir e interactuar con la aplicación.

### Paso 5: Generar el build de producción (Opcional)
Para validar optimizaciones y compilar los archivos de distribución finales:
```bash
npm run build
```
Los archivos optimizados y minificados se generarán dentro de la carpeta `/dist`.

---

## 👥 Desarrolladores (Autores)

*   **Patricio Zappellini**
*   **Lautaro Skarkloff**
