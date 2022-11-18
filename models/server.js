const express = require('express');
const cors = require('cors')



class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        // route paths
        this.usuariosPath = '/api/usuarios';

        // middlewares
        this.middlewares();


        // app routes
        this.routes();
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user.routes'));
    }


    middlewares() {
        // CORS
        this.app.use( cors() );

        // body business
        this.app.use( express.json() );

        // Directorio publico
        this.app.use( express.static('public'));
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Server on port ' + this.port);
        })
    }
}



module.exports = Server;