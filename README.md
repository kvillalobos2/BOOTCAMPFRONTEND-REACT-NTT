# My Market 🛒

## Arquitectura

Este proyecto sigue una **arquitectura modular**, diseñada para facilitar la mantenibilidad y escalabilidad del código. Se ha utilizado **Typescript Vanilla** para asegurar un código limpio, ligero y fácil de mantener.
### Estructura de Carpetas:

- **`components/`**: Contiene los componentes reutilizables de la interfaz de usuario, como el modal del carrito y los elementos individuales de productos.
- **`models/`**: Almacena los modelos de datos de la aplicación, los cuales definen las interfaces y las estructuras de los objetos utilizados en la aplicación.
- **`types/`**: Almacena los tipos reutilizables en toda la aplicación
- **`mappers/`**: Incluye las funciones que transforman los datos de la API en un formato adecuado para la vista de la aplicación. 
- **`services/`**: Maneja las interacciones con la API y la lógica de negocio relacionada con la obtención y manipulación de los datos. 
- **`store/`**: Almacena el estado global de la aplicación, en este caso, la información relacionada con el carrito de compras.

## Tecnologías Utilizadas

- **Typescript Vanilla**: Para garantizar la consistencia en los tipos de datos y mejorar la calidad del código mediante la tipificación estática.

## Configuraciones del Proyecto

Para probarlo localmente una vez descargado el código se deberá seguir los siguientes pasos:

- **npm i**: Instalación de las dependencias de Node.js.
- **npm run dev**: Para compilar y ejecutar el proyecto en modo de desarrollo.

