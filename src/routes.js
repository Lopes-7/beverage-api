/**
 * IMPORTS
 */
const routes = require('express').Router();
const mongoose = require('mongoose');
const Beverage = require('./models/beverage');


/**
 * CODE
 */

// connect to local database
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true})
.then(() => console.log('Connected to database'))
.catch(() => console.log('Could not connect to database'));

// get list of beverages
routes.get('/beverages', (req, res) => {
    // log request
    console.log('received request: ', req.method, req.url);

    // list all documents in database
    Beverage.find()
    .then(data => {
        console.log('response: 200 Found documents: ', data.length);
        return res.status(200).send(data);
    })
    .catch(error => {
        console.log('Could not find document', error);
        return res.status(404).send({message: 'Could not get db documents'})
    });
});


/**
 * EXPORTS
 */
module.exports = routes;
