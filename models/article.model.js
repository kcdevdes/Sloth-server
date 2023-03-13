const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  articleId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  modifiedAt: {
    type: Date,
    required: true,
  },
  likes: [{ type: String }],
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
