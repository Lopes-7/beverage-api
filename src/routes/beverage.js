/**
 * IMPORTS
 */
const routes = require('express').Router();
const Beverage = require('../models/beverage');

/**
 * CODE
 */

// get list of beverages
routes.get('/beverages', async (req, res) => {
    try {
        let result = await Beverage.find();
        res.status(200).json({ 'beverages': result });
    }
    catch (e) {
        console.log('error on request: ', e.message);
        res.status(500).json({ 'error': { 'status': 500, 'message': 'Internal Server Error' } });
    }
});

// get beverage by id
routes.get('/beverages/:id', async (req, res) => {
    try {
        // get parameter id
        const id = req.params.id;

        let result = await Beverage.findById(id);
        res.status(200).json({ 'beverage': result });
    }
    catch (e) {
        console.log('error on request: ', e.message);
        res.status(400).json({ 'error': { 'status': 400, 'message': e.reason.message } });
    }
});

// post beverage
routes.post('/beverages', async (req, res) => {
    try {
        // invalid body: throw error
        if (!req.body) {
            let error = new Error();
            error.status = 400;
            error.message = 'Request body not found';
            throw error;
        }

        // invalid price: throw error
        if (!req.body.price || isNaN(Number(req.body.price))) {
            let error = new Error();
            error.status = 400;
            error.message = 'Invalid price';
            throw error;
        }

        // invalid net weight: throw error
        if (!req.body.net_weight || isNaN(Number(req.body.net_weight))) {
            let error = new Error();
            error.status = 400;
            error.message = 'Invalid net weight';
            throw error;
        }

        // invalid name: throw error
        if (!req.body.name) {
            let error = new Error();
            error.status = 400;
            error.message = 'Invalid name';
            throw error;
        }

        // invalid vendor: throw error
        if (!req.body.vendor) {
            let error = new Error();
            error.status = 400;
            error.message = 'Invalid vendor';
            throw error;
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
        let result = await beverage.save();

        // return response created
        console.log('beverage created: ', result);
        res.status(201).json({ 'beverage': result });
    }
    catch (e) {
        console.log('error on request: ', e.message);
        res.status(400).json({ 'error': { 'status': e.status, 'message': e.message } });
    }
});


// put beverage by id
routes.put('/beverages/:id', async (req, res) => {
    try {
        // invalid body: throw error
        if (!req.body) {
            let error = new Error();
            error.status = 400;
            error.message = 'Request body not found';
            throw error;
        }

        // invalid price: throw error
        if (!req.body.price || isNaN(Number(req.body.price))) {
            let error = new Error();
            error.status = 400;
            error.message = 'Invalid price';
            throw error;
        }

        // invalid net weight: throw error
        if (!req.body.net_weight || isNaN(Number(req.body.net_weight))) {
            let error = new Error();
            error.status = 400;
            error.message = 'Invalid net weight';
            throw error;
        }

        // invalid name: throw error
        if (!req.body.name) {
            let error = new Error();
            error.status = 400;
            error.message = 'Invalid name';
            throw error;
        }

        // invalid vendor: throw error
        if (!req.body.vendor) {
            let error = new Error();
            error.status = 400;
            error.message = 'Invalid vendor';
            throw error;
        }

        // get data
        const price = Number(req.body.price);
        const net_weight = Number(req.body.net_weight);
        const price_per_liter = price / (net_weight / 1000);

        // get parameter id
        const id = req.params.id;

        // update document
        let beverage = await Beverage.findById(id);

        // beverage not found: throw error
        if (!beverage) {
            let error = new Error;
            error.status = 404;
            error.message = 'Beverage not found';
            throw error;
        }

        beverage.name = req.body.name;
        beverage.vendor = req.body.vendor;
        beverage.price = req.body.price;
        beverage.net_weight = req.body.net_weight;
        beverage.price_per_liter = price_per_liter;

        let result = await beverage.save();

        // return response updated
        console.log('beverage updated: ', result);
        res.status(201).json({ 'beverage': result });
    }
    catch (e) {
        console.log('error on request: ', e.message);
        res.status(e.status).json({ 'error': { 'status': e.status, 'message': e.message } });
    }
});

/**
 * EXPORTS
 */
module.exports = routes;
