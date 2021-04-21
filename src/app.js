/**
 * IMPORTS
 */
const express = require('express');
const mongoose = require('mongoose');

/**
 * CODE
 */

// App Controler class
class AppController {
    constructor() {
        this.express = express();
        this.database();
        this.middlewares();
        this.routes();
    }

    database() {
        mongoose
            .connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('Connected to database'))
            .catch(() => console.log('Could not connect to database'));
    }

    middlewares() {
        this.express.use(express.json());
    }

    routes() {
        // middleware to log requests
        this.express.use(require('./middlewares/log'));

        // beverages router
        this.express.use(require('./routes/beverage'));

        // vendors router
        this.express.use(require('./routes/vendor'));

        // errors router
        this.express.use(require('./error/error'));
    }
}

/**
 * EXPORTS
 */
module.exports = new AppController().express;
