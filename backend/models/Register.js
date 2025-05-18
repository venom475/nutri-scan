const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  number: { type: String, required: true },
  email: { type: String, required: true }
}, { timestamps: true, collection: 'registers' });

module.exports = mongoose.model('Register', RegisterSchema);
