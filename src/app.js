/**
 * IMPORTS
 */
const express = require('express');

/**
 * CODE
 */

// App Controler class
class AppController {
    constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(express.json());
    }

    routes() {
        this.express.use(require('./routes'));
    }
}

/**
 * EXPORTS
 */
module.exports = new AppController().express;
