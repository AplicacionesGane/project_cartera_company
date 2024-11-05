# Proyecto Cartera Grupo Empresarial Multired/Servired

## Descripción
- Este proyecto es una aplicación web que permite gestionar la cartera del Grupo Empresarial Multired/Servired.
Es un proyecto de código abierto que se encuentra en el repositorio de GitHub y utilizamos librerías open source.

## Infraestructura

- Api: 
  - Lenguaje: TypeScript
  - Framework: Express
  - Base de datos: MySQL 8.2
  - Servidor: Interno (Empresarial)
  - Repositorio: [https://github.com/llOrtegall/proyect_cartera/tree/master/client](https://github.com/llOrtegall/proyect_cartera/tree/master/client)
  - Librerías: Cors, Dotenv, Express, Mysql2, Nodemon, Typescript, Sequelize

- Frontend:
  - Lenguaje: TypeScript
  - Framework: React
  - Servidor: Interno (Empresarial)
  - Repositorio: [https://github.com/llOrtegall/proyect_cartera/tree/master/api](https://github.com/llOrtegall/proyect_cartera/tree/master/api)
  - Librerías: Axios, React, React-dom, React-router-dom, Typescript, xslx, sonner, tailwindcss, remixicon, tremor, headlessui/react

## Instalación

- Api: 
  - Definir las variables de entorno en el archivo .env (ver archivo .env.example)
  - Ejecutar el comando para instalar las dependencias dentro de la carpeta api
  ```
    npm install || yarn
  ```
  - Ejecutar el comando para compilar el proyecto
  ```
    npm run build || yarn build
  ```

  * Esto generará una carpeta dist con el código compilado dentro de api, la cual ya está configurada en el archivo docker-compose.yml en la raíz del proyecto y se encargará de levantar el contenedor con la imagen de Node.js y ejecutar el comando npm start para levantar el servidor.

- Frontend:
  - Definir las variables de entorno en el archivo .env (ver archivo .env.example)
  - Ejecutar el comando para instalar las dependencias dentro de la carpeta client
  ```
    npm install || yarn
  ```
  - Ejecutar el comando para compilar el proyecto
  ```
    npm run build || yarn build
  ```

  * Esto generará una carpeta build con el código compilado dentro de client, la cual ya está configurada en el archivo docker-compose.yml en la raíz del proyecto y se encargará de levantar el contenedor con la imagen de Nginx y copiar el contenido de la carpeta build dentro de la carpeta /usr/share/nginx/html/ para servir la aplicación web.

- Configuración
  - En el archivo docker-compose.yml se encuentran las configuraciones de los volúmenes que se levantarán para la aplicación web de Nginx. Se deja como esquema una configuración ya determinada.

## Uso
  - Para levantar la aplicación, se debe ejecutar el comando
  ```
    docker-compose up
  ```
  - La aplicación estará disponible en la dirección [http://localhost:8080](http://localhost:8080)
  - La API estará disponible en la dirección [http://localhost:3000](http://localhost:3000) por defecto, pero esto dependerá de la configuración de las variables de entorno dentro de api.

  - Recordar que en el archivo App.tsx del cliente se encuentra la URL de la API, la cual se debe cambiar si se cambia la dirección de la API.