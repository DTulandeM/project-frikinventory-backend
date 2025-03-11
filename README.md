# project-frikinventory-backend

Backend application to manage the product inventory in a Friki Week startup.

Proyecto el cual permite la conexión a una api alojada en un servidor de google cloud.

Por un lado el backend responde correctamente a las peticiones realizadas por el cliente frontend. Se desarrolló un app en express y se configura el servidor de google cloud para que permanesca trabajndo todo el tiempo a través de PM2 y NGINX. Esta aplicación tambien cuenta con conexión a una base de datos de moongose para el almacenamiento de las tarjetas y los datos de los usuarios.

Sus funciones principales:

Usuarios

1. Crear nuevos usuarios.
2. Actualizar la información del nombre, e imagen del usuario.
3. Recuperar la listar de todos los usuarios o uno esspecifico por su ID.

Productos

1. Crear una nueva Productos.
2. Eliminar Productos por su ID.
3. Actualizar información de los productos
4. Recuperar todas los productos o una especifico por su ID.

Las tecnologias empleadas son Nodejs, express, mongoose, MongoDB, gitHub, javaScripts, PM2 y ngnx
