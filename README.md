# My Market 🛒

## Testing 

Este proyecto incluye una serie de pruebas para garantizar la calidad y la estabilidad del código. Las pruebas cubren diferentes áreas de la aplicación, como componentes, contextos, hooks, páginas, rutas, servicios y utilidades.

### Tipos de Pruebas Implementadas

- **Pruebas de Componentes**: Se han probado diversos componentes de la interfaz de usuario (UI) para asegurar que se rendericen correctamente, manejen interacciones y actualicen el estado como se espera.
  
- **Pruebas de Contextos**: Los contextos que gestionan el estado global han sido probados para verificar que los datos se distribuyan correctamente a través de la aplicación y que los componentes reaccionen adecuadamente a los cambios de estado.

- **Pruebas de Hooks**: Los hooks personalizados, han sido probados para garantizar que manejen el estado y realicen las interacciones necesarias correctamente.

- **Pruebas de Páginas y Rutas**: Se han probado las rutas y las páginas de la aplicación para asegurarse de que la navegación funcione correctamente y las vistas se carguen como se espera.

- **Pruebas de Servicios**: Los servicios que interactúan con APIs han sido testeados para confirmar que las solicitudes HTTP se realicen correctamente y los datos se manejen adecuadamente.

- **Pruebas de Utilidades**: Las funciones utilitarias, como validaciones y formateadores, también han sido probadas para asegurar que realicen sus tareas correctamente.

### Herramientas Utilizadas

- **Jest**: Framework utilizado para ejecutar las pruebas unitarias y de integración.
- **React Testing Library**: Para pruebas de componentes React, simulando interacciones reales de los usuarios con la interfaz.

### Cómo Ejecutar los Tests

1. Instala las dependencias del proyecto:
   **npm install**
2. Para visualizar las pruebas en general: 
   **npm run coverage** 
3. Para probar por archivo:
   **npm run test file: src/app/services/_ _tests_ _/product.request.test.ts**

