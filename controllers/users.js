const User = require('../models/user');

const getMyProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports = { getMyProfile };
