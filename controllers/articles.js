const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');

const getArticles = (req, res, next) => {
  Article.find({})
    .then((data) => res.status(200).send(data))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const cardOwner = req.user._id;
  const cardId = req.params.id;

  Article.findOneAndDelete({ _id: cardId, owner: cardOwner })
    .then((data) => {
      if (data) {
        return res.status(200).send(data);
      }
      throw new NotFoundError('Article does not exist or was created not by you');
    })
    .catch(next);
};

module.exports = {
  getArticles, createArticle, deleteArticle,
};
