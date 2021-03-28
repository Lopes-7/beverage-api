/**
 * IMPORTS
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * CODE
 */

// beverage schema
const beverageSchema = mongoose.Schema({
    date: { type: Date, default: Date.now },
    name: { type: String, required: true },
    net_weight: { type: Number, required: true }, // in ml
    price: { type: Number, required: true }, // in R$
    price_per_liter: { type: Number, required: true }, // R$/l
    vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
});

/**
 * EXPORTS
 */
module.exports = mongoose.model('Beverage', beverageSchema);
