//activamos el modulo que utiliza en el fondo el http de nodejs
const express = require('express');


//vamos a ejecutar express, que nos retorna el servidor
const servidor = express(); 



//CONFIGURACIONES:
servidor.set('puertoServidor', 5000);


/*MIDDLEWARE: Aquí irían las funciones y llamadas correspondientes que se ejecutan antes de las particulares que dan respuesta según el metodo y ruta
    Todo Middleware se ejecuta con la funcion servidor.use(), aunque no tiene que ser una funcion lo que llame a ejecutar el .use()
    Esta sección sirve para extender el código del servidor
        -Podríamos por ejemplo procesar datos como autenticar un usuario ya que podemos tener los tres parámetros para acceder al cuerpo y la url en la funcion igualmente
        -Muchos middleware ya existen como el express.json() y no hay que hacerlos nosotros explicitamente
        -puedo requerirlos arriba (a parte de los de express.) podré requerir los de lo que importe arriba
*/


//Cabecera para entender los json que me llegan al servidor
servidor.use(express.json()); //es un middleware que transforma los objetos a .json para que podamos entenderlo despues




/*Todo el rato estamos pasando funciones anónimas por parámetro que definimos implicitamente en la misma signatura de la llamada*/




//despues de verificar los enrutamientos, despliego hacia el cliente la página principal
servidor.use(express.static('public'));

//Ponemos en marcha a escuchar el server
servidor.listen(servidor.get('puertoServidor'), () => {
    console.log('Servidor escuchando en el puerto ' + servidor.get('puertoServidor'));
});