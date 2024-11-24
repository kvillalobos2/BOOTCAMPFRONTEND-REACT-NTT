# My Market 🛒

## Arquitectura del Proyecto

Este proyecto sigue una **arquitectura modular**, basada en el patrón **Atomic Design**. Se ha utilizado **React + TypeScript** junto con un enfoque basado en carpetas que divide claramente las responsabilidades de la aplicación.

### Estructura de Carpetas:

- **`components/`**: Almacena los componentes reutilizables de la interfaz de usuario (UI), que encapsulan funcionalidad y estilos específicos para diferentes partes de la aplicación.

- **`context/`**: Gestiona el estado global de la aplicación utilizando React Context API. 

- **`domain/`**: Define la lógica y modelos asociados a las entidades del dominio. Incluye interfaces y estructuras clave para representar conceptos del negocio.

- **`hooks/`**: Contiene hooks personalizados que encapsulan lógica reutilizable y simplifican la interacción con componentes y servicios.

- **`pages/`**: Agrupa las vistas principales de la aplicación. 

- **`routes/`**: Gestiona la configuración de las rutas de la aplicación, facilitando la navegación entre diferentes vistas.

- **`services/`**: Gestiona las interacciones con la API. Este directorio contiene funciones y métodos para realizar solicitudes HTTP.

- **`utils/`**: Incluye funciones auxiliares y herramientas reutilizables, como validaciones y formateadores de datos.

## Tecnologías Utilizadas

- **React + TypeScript**: Garantiza un desarrollo eficiente.
- **Vite**: Proporciona un entorno de desarrollo rápido y moderno.
- **CSS**: Para los estilos de la aplicación aplicando la metodología de BEM.
  
## Configuración del Proyecto

Para ejecutar el proyecto localmente, sigue estos pasos:

1. npm i
2. npm run dev 
