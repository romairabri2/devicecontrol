'user strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/iotsystem', { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log("La conexión a la BDD se ha realizado exitosamente!!!");

            //Crear servidor y ponerme a escuchar peticiones HTTP
            app.listen(port, () => {
                console.log('Server corriendo en HTTP://localhost:'+ port);
            });
        });