const mongoose = require('mongoose');

const UploadedDataSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  mimeType: { type: String, required: true },
  fileBuffer: { type: Buffer, required: true },
  apiResponse: { type: Object, required: true }
}, { timestamps: true, collection: 'uploadedData' });

module.exports = mongoose.model('UploadedData', UploadedDataSchema);
