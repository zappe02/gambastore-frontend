# Gamba Store - Frontend

Este repositorio contiene la aplicación cliente (Frontend) de **Gamba Store**, una Single Page Application (SPA) diseñada para la gestión y compra de calzado deportivo (botines). El presente proyecto fue desarrollado en el marco de la materia **Paradigmas y Lenguajes de Programación (Ciclo Lectivo 2026)**.

El sistema implementa una arquitectura desacoplada, donde el frontend funciona como un cliente enriquecido e independiente que interactúa con un backend RESTful desarrollado en Laravel.

---

## Tecnologías Utilizadas

El desarrollo del frontend se asienta sobre un stack tecnológico moderno, seleccionado con criterios de modularidad, rendimiento y robustez:

*   **React (v19)**: Librería principal basada en componentes reactivos y estados controlados para construir la interfaz de usuario de forma eficiente mediante la manipulación del Virtual DOM.
*   **Vite (v8)**: Herramienta de construcción y empaquetador de última generación. Facilita ciclos de desarrollo ágiles gracias a su servidor basado en Módulos ES Nativos (ESM) y optimiza el bundle final en producción mediante Rollup.
*   **Tailwind CSS y CSS Modules**:
    *   *CSS Modules*: Utilizado para encapsular estilos a nivel de componente, previniendo colisiones de nombres de clases y polución CSS global.
    *   *Tailwind CSS*: Framework de diseño que agiliza el desarrollo de la interfaz de usuario mediante clases de utilidad parametrizadas y un enfoque responsivo adaptativo (Mobile-First).
*   **Axios**: Cliente HTTP basado en promesas para la comunicación asíncrona con la API de Laravel, permitiendo configurar interceptores para inyectar cabeceras de seguridad de forma centralizada.
*   **Mercado Pago API**: Integración para el procesamiento transaccional de pagos seguros. Se implementa de forma indirecta mediante la obtención dinámica del punto de inicio (`init_point`) generado en el servidor.
*   **Firebase Authentication**: Servicio de autenticación federada (Google OAuth) utilizado para simplificar el proceso de registro del usuario, disminuyendo la fricción y garantizando una gestión segura de identidades.

---

## Arquitectura y Flujo de Compra Híbrido

Para optimizar el embudo de conversión y disminuir la tasa de abandono de carritos, el sistema implementa una arquitectura de **flujo de compra híbrido**:

1.  **Flujo de Invitado (Guest Checkout)**: Diseñado para transacciones inmediatas sin registro previo. El usuario ingresa directamente la dirección de entrega e información básica, procediendo al pago sin requerir credenciales persistentes. Los registros de compra se almacenan temporalmente en el dispositivo actual mediante `localStorage` para el rastreo del envío.
2.  **Flujo de Usuario Registrado (Firebase Auth)**: Utiliza autenticación delegada de Firebase. Al iniciar sesión, el cliente recibe y almacena de forma segura un JSON Web Token (JWT) que permite:
    *   Autocompletar de manera automatizada los datos de envío en el checkout.
    *   Sincronizar y consultar de manera persistente el historial de pedidos multidispositivo desde la base de datos central en Laravel.

---

## Seguridad (Crítico)

El diseño de la aplicación implementa mecanismos de seguridad rigurosos en la capa cliente-servidor para salvaguardar la integridad del sistema:

### 1. CORS Estricto (Cross-Origin Resource Sharing)
Para mitigar ataques de falsificación de peticiones en sitios cruzados (CSRF) y accesos no autorizados a la API, el servidor Laravel cuenta con una política de CORS estricta. El origen del frontend:
`https://gambastore-frontend.vercel.app`
está explícitamente configurado como origen permitido en la lista blanca (*whitelist*) del backend, denegando solicitudes provenientes de dominios no autorizados.

### 2. Limitación de Tasa (Throttle / Prevención de DoS)
La comunicación con los endpoints críticos del backend (especialmente la creación de pedidos `/api/pedidos` y autenticación) implementa restricciones de tasa de peticiones (*Rate Limiting* / *Throttling*). Esto previene ataques de Denegación de Servicio (DoS), intentos de fuerza bruta en formularios y abusos en la generación masiva de preferencias de cobro de Mercado Pago.

### 3. Gestión de Variables de Entorno (`.env`)
Las claves de API públicas, identificadores de Firebase y URL del backend no se declaran directamente en el código fuente. Se gestionan mediante un archivo `.env` del lado del cliente, garantizando que:
*   Los valores varíen de manera transparente según el entorno (Desarrollo vs. Producción en Vercel).
*   No se expongan claves sensibles en repositorios públicos.

---

## Instrucciones de Instalación y Ejecución

Siga los siguientes pasos para configurar y ejecutar localmente el entorno de desarrollo del frontend:

### Requisitos Previos
*   **Node.js** (Versión 18 o superior recomendada)
*   **npm** (Gestor de paquetes de Node)

### Paso 1: Clonar el Repositorio
```bash
git clone https://github.com/zappe02/gambastore-frontend.git
cd gambastore-frontend
```

### Paso 2: Instalar Dependencias
Instale los paquetes requeridos por el proyecto declarados en el `package.json`:
```bash
npm install
```

### Paso 3: Configurar Variables de Entorno
Cree un archivo `.env` en la raíz del proyecto basándose en el archivo de plantilla proporcionado (si aplica) y configure las variables de la API:
```env
VITE_API_URL=https://tu-servidor-laravel.com/api
# Claves públicas de Firebase
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
```

### Paso 4: Iniciar el Servidor de Desarrollo
Ejecute el comando para iniciar el servidor local optimizado de Vite:
```bash
npm run dev
```
La aplicación estará accesible en: `http://localhost:5173` (o el puerto que indique la consola).

---

## Autores

*   **Patricio Zappellini** (Desarrollador)
*   **Lautaro Skarkloff** (Desarrollador)

---
*Este proyecto fue diseñado y defendido con fines académicos para la cátedra de Paradigmas y Lenguajes de Programación de la Universidad.*
