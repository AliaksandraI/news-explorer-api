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

  Article.create({ keyword, title, text, date, source, link, image, owner })
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const owner = req.user._id;
  const cardId = req.params.id;

    Article.findById( cardId, function (err, result) {
      if (err) {
        throw new NotFoundError('No article with that id');
      } else {
          if (owner === result.owner) {
           return res.status(200).send(result);
          }
          throw new OwnerError({ message: 'This article was added by another user' });
      }
    })
    .catch(next);
};

module.exports = {
  getArticles, createArticle, deleteArticle,
};
