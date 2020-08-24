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

// get beverage by id
routes.get('/beverages/:id', (req, res) => {
    // log request
    console.log('received request: ', req.method, req.url);

    // get parameter id
    const id = req.params.id;

    // get document with provided id
    Beverage.findOne({_id: id})
    .then(data => {
        if (data !== null) {
            console.log('response: 200 Found document: ', data);
            return res.status(200).send(data);
        }
        console.log('Could not find document');
        return res.status(404).send({message: 'could not get document'})
    })
    .catch(() => {
        console.log('Could not find document');
        return res.status(404).send({message: 'could not get document'})
    });
});


/**
 * EXPORTS
 */
module.exports = routes;
