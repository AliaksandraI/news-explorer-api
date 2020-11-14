const express = require('express');
const { celebrate, Joi } = require('celebrate');

const articles = express.Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');

articles.get('/', getArticles);

articles.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/),
    image: Joi.string().required().pattern(/(https?:\/\/.*\.(?:png|jpg))/),
  }).unknown(true),
}), createArticle);

articles.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }).unknown(true),
}), deleteArticle);

module.exports = articles;
