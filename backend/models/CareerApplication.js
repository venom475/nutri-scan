const mongoose = require('mongoose');

const CareerApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  jobField: { type: String, required: true },
  resume: {
    data: Buffer,
    contentType: String,
    originalName: String
  }
}, { timestamps: true, collection: 'careerapplications' });

module.exports = mongoose.model('CareerApplication', CareerApplicationSchema);
