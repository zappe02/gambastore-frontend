# Documentación del proyecto — Gambastore Frontend

## Resumen
Aplicación frontend en React + Vite para una tienda (Gambastore). Proyecto en estado de desarrollo: UI principal implementada con rutas y páginas básicas, datos de productos disponibles en un mock local y un servicio de API ligero.

## Estructura principal

- `index.html` — entrada HTML.
- `package.json` — dependencias y scripts.
- `vite.config.js` — configuración de Vite.
- `src/` — código fuente:
  - `main.jsx`, `App.jsx` — arranque de la aplicación.
  - `assets/` — imágenes y recursos.
  - `components/` — componentes reutilizables:
    - `BottomNav.jsx`, `Layout.jsx`, `WelcomeScreen.jsx` (+ sus CSS modules).
  - `pages/` — vistas principales:
    - `Catalogo.jsx` — listado de productos.
    - `DetalleProducto.jsx` — detalle individual (archivo actualmente abierto al editar).
    - `Carrito.jsx`, `Checkout.jsx`, `Exito.jsx` — flujo de compra.
  - `services/` — lógica de acceso a datos:
    - `api.js` — cliente/funciones para llamadas.
    - `productos.mock.js` — datos de ejemplo para desarrollo.

## Estado actual
- Rutas y páginas principales creadas y estilizadas mediante módulos CSS.
- Mock de productos implementado en `src/services/productos.mock.js`.
- No se detectan tests automatizados en el repositorio (sin carpeta `tests` ni scripts de test en `package.json`).
- Archivo abierto en el editor actualmente: `src/DetalleProducto.jsx`.

## Cómo ejecutar (desarrollo)

1. Instalar dependencias:

```
npm install
```

2. Iniciar servidor de desarrollo:

```
npm run dev
```

3. Abrir `http://localhost:5173` (o la URL que muestre Vite).

Nota: Si el proyecto usa Yarn o pnpm, ajustar comandos a `yarn` o `pnpm`.

## Scripts recomendados a verificar
- `dev` — servidor de desarrollo (Vite).
- `build` — compilación para producción.
- `preview` — servir build localmente.

Revisar `package.json` para confirmar nombres exactos de scripts.

## Dependencias y herramientas
- React, Vite y CSS Modules (ver `package.json` para versiones exactas).
- No se listan herramientas de testing ni CI en este estado.

## Notas y próximos pasos sugeridos
- Añadir pruebas unitarias y/o de integración.
- Conectar `api.js` a backend real o ampliar mocks.
- Documentar contrato del API (endpoints, payloads) si se dispone de backend.
- Añadir un `README.md` más completo con capturas, decisiones de diseño y convenciones de estilo (este archivo funciona como documento técnico rápido).

Si quieres, puedo:
- Actualizar o traducir este archivo.
- Añadir instrucciones de build/producción más detalladas.
- Generar un `README.md` más completo con ejemplos y capturas.

## Guías de estilo y convenciones (para Gemini Pro y desarrolladores)

Estas pautas ayudan a que modelos (p. ej. Gemini Pro) y nuevos desarrolladores interpreten correctamente cómo diseñar y extender el código.

- **Estructura y nombres:** Componentes React en `src/components/` y `src/pages/` deben usar PascalCase (ej. `DetalleProducto.jsx`). Archivos de estilo usan `.module.css` y el nombre coincide con el componente (ej. `DetalleProducto.module.css`).
- **JSX y componentes:** Mantener componentes pequeños y con una sola responsabilidad. Preferir componentes funcionales con hooks. Extraer lógica compleja a hooks personalizados en `src/hooks/` si se crea.
- **Props y tipos:** Documentar props esperadas en comentarios o usar `PropTypes` / TypeScript. Indicar si un prop es obligatorio y su forma (objeto, string, array).
- **Estado y datos:** Usar `useState`/`useReducer` para estado local; `Context` o soluciones externas (Redux, Zustand) sólo si la aplicación lo requiere. `services/api.js` centraliza llamadas HTTP; usar `async/await`, manejo de errores y timeouts.
- **Mocks y desarrollo:** `src/services/productos.mock.js` sirve como fuente de datos durante desarrollo; mantener la misma forma de datos que la API real para facilitar reemplazo.
- **Estilos y CSS Modules:** Usar CSS Modules; clases en camelCase. Preferir variables CSS para tokens (colores, tamaños, espaciado) en `:root` o en un archivo de variables compartido. Mantener estilos específicos en el module del componente y estilos de layout en `components/Layout.module.css`.
- **Accesibilidad (a11y):** Todo elemento visual debe contemplar: `alt` en imágenes, roles y `aria-*` cuando corresponda, navegación por teclado y contraste de color adecuado.
- **Responsive:** Diseñar pensando mobile-first; usar unidades relativas (rem, %) y breakpoints definidos.
- **Performance:** Lazy-load de rutas y de imágenes grandes. Evitar renders innecesarios con `React.memo` y `useMemo` cuando tenga sentido.
- **Testing:** Recomendar `Jest` + `@testing-library/react` para pruebas unitarias de componentes y hooks. Añadir pruebas para flujos críticos (carrito, checkout).
- **Lint y formateo:** Mantener `eslint` y `prettier` (revisar `eslint.config.js`). Configurar `husky`/`lint-staged` opcionalmente para chequeos pre-commit.
- **Commits y PRs:** Mensajes claros y en español/inglés consistente; PRs pequeños y atómicos. Incluir descripción del cambio, cómo probar y capturas si aplica.
- **Documentación para modelos (ej. Gemini Pro):** Al pedir diseño de código, incluir:
  - Objetivo claro (qué debe hacer la funcionalidad).
  - Archivos a modificar y ejemplos de entradas/salidas esperadas.
  - Restricciones (compatibilidad, performance, accesibilidad).
  - Estilo preferido (hooks vs clases, uso de CSS Modules, naming conventions).

Si quieres, puedo incorporar un archivo `CONTRIBUTING.md` con estas reglas automatizadas y plantillas de PR/issue.
