//activamos el modulo que utiliza en el fondo el http de nodejs
const express = require('express');
//activo también el módulo para poder coger la ruta después
const path = require('path');


//vamos a ejecutar express, que nos retorna el servidor
const servidor = express(); 



//CONFIGURACIONES:
servidor.set('puertoServidor', 5000);


//Cabecera para entender los json que me llegan al servidor
servidor.use(express.json()); //es un middleware que transforma los objetos a .json para que podamos entenderlo despues


//Pongo un capturador para cuando se solicita la solucion, y se indica en la URL el pasatiempo concreto
servidor.get('/soluciones/:idPasatiempo', (request, response) =>{
    if(request.params.idPasatiempo == "pasatiempo1"){
        response.sendFile(path.join(__dirname, 'soluciones/pasatiempo1.json'));
    }else if(request.params.idPasatiempo == "pasatiempo2"){
        response.sendFile(path.join(__dirname, 'soluciones/pasatiempo2.json'));
    }else{
        response.sendFile(path.join(__dirname, 'soluciones/pasatiempo3.json'));
    }

});



//despues de verificar los enrutamientos, si ninguno se ha ejecutado, despliego hacia el cliente la página principal
servidor.use(express.static('public'));





//Ponemos en marcha a escuchar el server
servidor.listen(servidor.get('puertoServidor'), () => {
    console.log('Servidor escuchando en el puerto ' + servidor.get('puertoServidor'));
});