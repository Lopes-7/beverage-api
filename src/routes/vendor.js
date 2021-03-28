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
    // log request
    console.log('received request: ', req.method, req.url);

    try {
        const result = await Vendor.find({});
        res.status(200).send(result);
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ message: 'An error occurred' });
    }
});

// post vendor
routes.post('/vendors', async (req, res) => {
    // log request
    console.log('received request: ', req.method, req.url);

    try {
        if (!req.body || !req.body.name || !req.body.city)
            throw new Error('Bad payload');

        const vendor = new Vendor({
            address: req.body.address ? req.body.address : '',
            city: req.body.city,
            name: req.body.name,
        });

        const result = await vendor.save();
        res.status(200).send(result);
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ message: 'An error occurred' });
    }

});

/**
  * EXPORTS
  */
module.exports = routes;
