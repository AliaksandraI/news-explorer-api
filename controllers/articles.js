const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const OwnerError = require('../errors/owner-err');

const getArticles = (req, res, next) => {
  Article.find({})
    .then((data) => res.status(200).send(data))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  const owner = req.user._id;

  Article.create({ keyword, title, text, date, source, link, image })
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const owner = req.user._id;

  if (owner === req.params.id) {
    Article.findOneAndDelete({ _id: req.params.id, owner })
      .then((data) => {
        if (data) {
          return res.status(200).send(data);
        }
        throw new NotFoundError('No article with that id');
      })
      .catch(next);
  }
  throw new OwnerError({ message: 'This article was added by another user' });
};

module.exports = {
  getArticles, createArticle, deleteArticle,
};
