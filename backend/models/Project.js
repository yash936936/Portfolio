const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: String,
  link: String
});
module.exports = mongoose.model('Project', ProjectSchema);