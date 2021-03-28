/**
 * IMPORTS
 */
const mongoose = require('mongoose');

/**
  * CODE
  */

// vendor schema
const vendorSchema = mongoose.Schema({
    address: { type: String },
    city: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    name: { type: String, required: true },
});

/**
  * EXPORTS
  */
module.exports = mongoose.model('Vendor', vendorSchema);
