const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const EmailError = require('../errors/email-err');

module.exports.createUser = (req, res, next) => {
  const {
    name, email,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        throw new EmailError({ message: 'This email is already used' });
      } else next(err);
    })
    .then((user) => {
      res.status(201).send({
        name: user.name, email: user.email,
      });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email } = req.body;

  return User.findOne({ email }).select('+password')
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' }),
      });
    })
    .catch(next);
};
