const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
   title: {
        type : String,
    },
   image: {
        type : String
    },
   text: {
      type : String
   },
   created: { type: Date, default: Date.now },
});

const Blog = new mongoose.model('Blog',blogSchema);
module.exports = Blog;