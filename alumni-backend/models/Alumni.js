const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  collegeName: { type: String, required: true },
  batch: { type: String, required: true },
  branch: { type: String, required: true },
  position: { type: String, required: true },
  checkbox1: { type: Boolean, required: true },
  checkbox2: { type: Boolean, required: true },
});

module.exports = mongoose.model('Alumni', alumniSchema);
