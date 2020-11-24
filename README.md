# Pagina-WISE
======
Proceso de setup"

Instalar modulos de node:

```
node install
```

Instalar MongoDB Community Server: https://www.mongodb.com/try/download/community

Crear la base de datos de nombre WISE_ITESM, con la colección inicial datosHome;
se puede usar MongoDB Compass conectado a localhost:27017 para crear la BD o puedes usar 
directamente la mongo shell.

(Asegurarse que ma base de datos corre en el puerto 27017)


Ejecutar el servidor en modo development (ejecutar desde Pagina-WISE/FrontEnd/):
```
npm run dev
```
(se actualiza en tiempo real usando el paquete nodemon)

------

Ejecutar el servidor en deploy (ejecutar desde Pagina-WISE/FrontEnd/):
```
npm run server
```
o

```
node server
```