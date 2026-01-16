# EGO Challenge - Frontend

Aplicación Frontend challenge para EGO Agency, contruida con React, TypeScript y Vite. Integrando Axios, react-router-dom y TailwindCSS.

## Requisitos

- Node.js (v18 o superior)
- npm o yarn

## Instrucciones de Instalación

1.  **Clonar el repositorio:**

    ```bash
    git clone <repository-url>
    cd ego-challenge
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Configuración del entorno:**

    Copiar el archivo de entorno de ejemplo para crear la configuración local:

    ```bash
    cp .env.example .env
    ```

    El archivo `.env` contiene la URL base de la API:
    ```
    VITE_API_BASE_URL=
    ```

4.  **Ejecutar la aplicación:**

    ```bash
    npm run dev
    ```

    La aplicación estará disponible en `http://localhost:5173` (o el puerto mostrado en tu terminal).

## Construcción para Producción

Para construir el proyecto para producción:

```bash
npm run build
```

Esto creará una carpeta `dist` con los assets compilados.

## Estructura del Proyecto

- `src/components`: Componentes UI reutilizables.
- `src/pages`: Vistas principales de la aplicación (Home, ModelDetail).
- `src/hooks`: Hooks personalizados de React para la lógica de negocio.
- `src/services`: Servicios de integración con la API.
- `src/types`: Definiciones de tipos TypeScript.
- `src/constants`: Constantes de configuración.

## Testing

Se agregaron tests de integración básicos luego de la entrega, en una rama separada, para validar estados clave de la interfaz (carga, ausencia de datos y renderizado con respuestas limitadas de la API).

Los tests se enfocan en el comportamiento visible de la aplicación y no en los detalles internos de implementación.
