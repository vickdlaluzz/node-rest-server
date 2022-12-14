const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');
const fileUpload = require('express-fileupload');



class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        // route paths
        this.paths = {
            usuarios: '/api/usuarios',
            auth: '/api/auth',
            categorias: '/api/categorias',
            productos: '/api/productos',
            busquedas: '/api/busquedas',
            uploads: '/api/uploads'

        }

        // Conectar a base de datos
        this.dbConnection();

        // middlewares
        this.middlewares();


        // app routes
        this.routes();
    }

    async dbConnection() {
        await dbConnection();
    }

    routes() {
        this.app.use(this.paths.usuarios, require('../routes/user.routes'));
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.categorias, require('../routes/categoria.routes'));
        this.app.use(this.paths.productos, require('../routes/producto.routes'));
        this.app.use(this.paths.busquedas, require('../routes/busqueda.routes'));
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'));
    }


    middlewares() {
        // CORS
        this.app.use( cors() );

        // body business
        this.app.use( express.json() );

        // Directorio publico
        this.app.use( express.static('public'));

        // Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Server on port ' + this.port);
        })
    }
}



module.exports = Server;