### Este proyecto es una implementación modular de una arquitectura de Microservicios para un sistema de comercio electrónico, desarrollada con Spring Boot y Java 17. Su diseño está orientado a la escalabilidad, mantenibilidad y despliegue independiente de cada servicio, siguiendo buenas prácticas de arquitectura distribuida.

## Características principales
- Arquitectura basada en microservicios: separación clara de responsabilidades (productos, clientes, órdenes, autenticación).
- Spring Boot + Java 17: aprovechando las últimas mejoras del lenguaje y del framework.
- API RESTful: endpoints bien definidos para la comunicación entre servicios y con el frontend.
- Gestión de seguridad y autenticación: integración con JWT y API Gateway para control de accesos.
- Persistencia modular: cada servicio maneja su propia base de datos, favoreciendo la independencia y consistencia.
- Escalabilidad: los servicios pueden desplegarse y escalarse de forma autónoma.
- Integración con frontend React: panel de administración para clientes, productos y órdenes.
