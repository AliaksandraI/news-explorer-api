const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        const regEx = /(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/;
        return regEx.test(link);
      },
      message: 'Invalid URL',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        const regEx = /(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/;
        return regEx.test(link);
      },
      message: 'Invalid URL',
    },
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('article', articleSchema);
