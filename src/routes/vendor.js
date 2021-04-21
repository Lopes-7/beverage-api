/**
 * IMPORTS
 */
const routes = require('express').Router();
const Vendor = require('../models/vendor');

/**
  * CODE
  */

// get list of vendors
routes.get('/vendors', async (req, res) => {
    try {
        let result = await Vendor.find();
        res.status(200).json({ 'vendors': result });
    }
    catch (e) {
        console.log('error on request: ', e.message);
        res.status(500).json({ 'error': { 'status': 500, 'message': 'Internal Server Error' } });
    }
});

// get vendor by id
routes.get('/vendors/:id', async (req, res) => {
    try {
        // get parameter id
        const id = req.params.id;

        let result = await Vendor.findById(id);
        res.status(200).json({ 'vendor': result });
    }
    catch (e) {
        console.log('error on request: ', e.message);
        res.status(400).json({ 'error': { 'status': 400, 'message': e.reason.message } });
    }
});

// post vendor
routes.post('/vendors', async (req, res) => {
    try {
        // invalid body: throw error
        if (!req.body) {
            let error = new Error();
            error.status = 400;
            error.message = 'Request body not found';
            throw error;
        }

        // invalid name: throw error
        if (!req.body.name) {
            let error = new Error();
            error.status = 400;
            error.message = 'Invalid name';
            throw error;
        }

        // invalid city: throw error
        if (!req.body.city) {
            let error = new Error();
            error.status = 400;
            error.message = 'Invalid city';
            throw error;
        }

        // create vendor object
        const vendor = new Vendor({
            address: req.body.address ? req.body.address : '',
            city: req.body.city,
            name: req.body.name,
        });

        // save vendor to DB
        let result = await vendor.save();

        // return response created
        console.log('vendor created: ', result);
        res.status(201).json({ 'vendor': result });
    }
    catch (e) {
        console.log('error on request: ', e.message);
        res.status(400).json({ 'error': { 'status': e.status, 'message': e.message } });
    }

});

/**
  * EXPORTS
  */
module.exports = routes;
