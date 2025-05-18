const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
}, { timestamps: true, collection: 'blogposts' });

module.exports = mongoose.model('BlogPost', BlogPostSchema);
