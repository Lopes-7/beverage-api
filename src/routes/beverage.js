/**
 * IMPORTS
 */
const routes = require('express').Router();
const Beverage = require('../models/beverage');
const getUrlParameters = require('../utils');

/**
 * CODE
 */

// get list of beverages
routes.get('/beverages', (req, res) => {
    // log request
    console.log('received request: ', req.method, req.url);

    // get url parameters
    const params = getUrlParameters(req.url);

    // list all documents in database
    Beverage.find(params)
        .then((data) => {
            console.log('response: 200 Found documents: ', data.length);
            return res.status(200).send(data);
        })
        .catch((error) => {
            console.log('Could not find document', error);
            return res
                .status(404)
                .send({ message: 'Could not get db documents' });
        });
});

// get beverage by id
routes.get('/beverages/:id', (req, res) => {
    // log request
    console.log('received request: ', req.method, req.url);

    // get parameter id
    const id = req.params.id;

    // get document with provided id
    Beverage.findOne({ _id: id })
        .then((data) => {
            if (data !== null) {
                console.log('response: 200 Found document: ', data);
                return res.status(200).send(data);
            }
            console.log('Could not find document');
            return res.status(404).send({ message: 'could not get document' });
        })
        .catch(() => {
            console.log('Could not find document');
            return res.status(404).send({ message: 'could not get document' });
        });
});

// post beverage
routes.post('/beverages', (req, res) => {
    // log request
    console.log('received request: ', req.method, req.url);

    // bad payload: throw error response
    if (
        !req.body ||
        !req.body.price ||
        !req.body.net_weight ||
        !req.body.name ||
        !req.body.vendor ||
        isNaN(Number(req.body.price)) === true ||
        isNaN(Number(req.body.net_weight)) === true
    ) {
        console.log('result: bad payload');
        return res.status(400).send({ message: 'bad payload' });
    }

    // get data
    const price = Number(req.body.price);
    const net_weight = Number(req.body.net_weight);
    const price_per_liter = price / (net_weight / 1000);

    // instatiate new beverage
    const beverage = new Beverage({
        name: req.body.name,
        price,
        net_weight,
        price_per_liter,
        vendor: req.body.vendor,
    });

    // save beverage to db
    beverage.save();

    // return response created
    return res.status(201).send(beverage);
});

// put beverage by id
routes.put('/beverages/:id', async (req, res) => {
    // log request
    console.log('received request: ', req.method, req.url);

    // bad payload: throw error response
    if (
        !req.body ||
        !req.body.price ||
        !req.body.net_weight ||
        !req.body.name ||
        !req.body.vendor ||
        isNaN(Number(req.body.price)) === true ||
        isNaN(Number(req.body.net_weight)) === true
    ) {
        console.log('result: bad payload');
        return res.status(400).send({ message: 'bad payload' });
    }

    // get data
    const price = Number(req.body.price);
    const net_weight = Number(req.body.net_weight);
    const price_per_liter = price / (net_weight / 1000);

    // get parameter id
    const id = req.params.id;

    // update document
    await Beverage.findByIdAndUpdate(
        { _id: id },
        {
            name: req.body.name,
            price,
            net_weight,
            price_per_liter,
            vendor: req.body.vendor,
        }
    )
        .then((result) => {
            console.log('result: ', result);
            return res.status(200).send(result);
        })
        .catch((error) => {
            console.log(error);
            console.log('Could not find document');
            return res.status(404).send({ message: 'could not get documents' });
        });
});

// delete beverage by id
routes.delete('/beverages/:id', (req, res) => {
    // log request
    console.log('received request: ', req.method, req.url);

    // get parameter id
    const id = req.params.id;

    // get document with provided id
    Beverage.deleteOne({ _id: id })
        .then((result) => {
            console.log('result: ', result);
            return res.status(200).send(result);
        })
        .catch(() => {
            console.log('Could not find document');
            return res
                .status(404)
                .send({ message: 'could not get db documents' });
        });
});

/**
 * EXPORTS
 */
module.exports = routes;
