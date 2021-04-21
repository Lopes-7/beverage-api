/**
 * IMPORTS
 */
const routes = require('express').Router();

/**
 * CODE
 */
routes.use((req, res) => {
    res.status(404).json({ 'error': { 'status': 404, 'message': 'Not found' } });
});

/**
 * EXPORTS
 */
module.exports = routes;
