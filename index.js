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

function ejemploMiddleware(request, response, next){
    console.log('Probando el Middleware, a ver si me pinto por el medio');
    console.log(`CONEXION ENTRANTE:\n   +Protocolo ->${request.protocol}\n  +HOST ->${request.get('host')}\n    +RUTA PEDIDA ->${request.originalUrl}`)
    next(); //para que continue la ejecución
}



//Cabecera para entender los json que me llegan al servidor
servidor.use(express.json()); //es un middleware que transforma los objetos a .json para que podamos entenderlo despues

servidor.use(ejemploMiddleware);





/*Todo el rato estamos pasando funciones anónimas por parámetro que definimos implicitamente en la misma signatura de la llamada*/
//listener genérico independiente del tipo de método que se use en la peticion
servidor.all('/', (request, response, next) =>{

    console.log("BIENVENIDO A MI SERVIDOR, VENGAS DE DONDE VENGAS");
    //al colocar el next permito a la ejecución seguir hacia abajo según el modelo de la máquina Von Newman
    next();     

    //De colocar en vez de next() un response.send('CualquierCosa'); no dejaria serguir, responderia a la peticion y terminaría

});




//listener de peticiones get. Cuando se reciba una al directorio raíz hacemos lo que indica la funcion
//servidor.get('/', (request, response) =>{
    //respondo con un mensaje de vuelta
    //response.send('Hola Mundo, primer intento de Nodejs con Express :)');
//});


/*Enrutamiento: creación de subdirectorios en el servidor. Siempre antes de poner en marcha el server con .listen()*/

servidor.get('/about', (request, response) =>{
    response.send('Informacion sobre el servidor');
});

servidor.get('/test', (request, response) =>{
    response.send('<h1>TEST</h1>');
});

servidor.get('/retornarDatos', (request, response) =>{
    //especificamos que vamos a mandar un objeto de javascript como respuesta (formado por pares clave-valor)
    response.json({
        ususario: 'Rechon',
        apellido: 'Cuadrillero'
    });
});


/*Métodos HTTP: POST PUT DELETE*/

servidor.post('/', (request, response) =>{
    //Sirven para recibir datos, guardarlos y después devolver una respuesta, pero la info viaja en el cuerpo
    response.send('Se ha recibido una petición POST');
});

servidor.post('/enviarUsuario', (request, response) =>{
    //recibo datos que me envía la aplicacion (están en request body)
    datos = request.body; 
    console.log(datos);

    //Express per se, no entiende los JSON entonces hay que añadir la cabecera 
    //servidor.use(express.json());
    
});

servidor.post('/enviarIDURL/:id', (request, response) =>{
    //Con :id defino una ruta dinamica que tiene una variable en la que se va a capturar precisamente lo que venga
    capturoObjetoDeLaURL = request.params
    capturoID = request.params.id
    console.log("OBJETO" + capturoObjetoDeLaURL);
    console.log("ID SOLO" + capturoObjetoDeLaURL);

    //despues de hacer lo que quiera, contesto de vuelta e inserto el valor de la variable recibida
    response.send(`Id de ususario ${capturoID} recibida, Muchas Gracias.`);

});




servidor.put('/', (request, response) =>{
    //Sirve para coger los datos que me da el frontEnd 
    response.send('Se ha recibido una petición PUT');
});




servidor.delete('/', (request, response) =>{
    //Eliminar un dato dentro del server y devolver una respuesta
    response.send('Se ha recibido una petición DELETE');
});




/*MIDDLEWARE 2: Vamos a hacer uso de un middleware definido dentro del propio framework express
        1. Crearemos una carpeta de nombre public por ejemplo
        2. Al middleware express.static le pasamos el nombre de la carpeta
        3. Creamos dentro de la carpeta un index.html que contendrá una página HTML 5
        4. Ésta será la página raíz de mi servidor, porque después de pasar los enrutamientos no coincide con ninguno y va a retornar el index.html
        5. Si estuviera enlazado con un css o js que estaría todo dentro de public (es la parte publica de nuestro servidor, públicamente accesible)
*/

servidor.use(express.static('public'));




//Ponemos en marcha a escuchar el server
servidor.listen(servidor.get('puertoServidor'), () => {
    console.log('Servidor escuchando en el puerto ' + servidor.get('puertoServidor'));
});