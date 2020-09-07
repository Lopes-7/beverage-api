/**
 * IMPORTS
 */
const mongoose = require('mongoose');

/**
 * CODE
 */

// beverage schema
const beverageSchema = mongoose.Schema({
    created_at: {type: Date, default: Date.now},
    name: {type: String, required: true},
    net_weight: {type: Number, required: true}, // in ml
    price: {type: Number, required: true}, // in R$
    price_per_liter: {type: Number, required: true}, // R$/l
    vendor: {type: String, required: true},
});

/**
 * EXPORTS
 */
module.exports = mongoose.model('Beverage', beverageSchema);
