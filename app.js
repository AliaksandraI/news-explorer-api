require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');

const { PORT = 3003 } = process.env;

const { createUser, login } = require('./controllers/auth');
const notfoundRouter = require('./routes/notfound');

const app = express();

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://localhost:27017/news', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);

app.post('/api/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/),
    password: Joi.string().required().min(6),
  }).unknown(true),
}), createUser);

app.post('/api/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/),
    password: Joi.string().required().min(6),
  }).unknown(true),
}), login);

app.use(auth);

app.use('/api/users', require('./routes/users'));
app.use('/api/articles', require('./routes/articles'));

app.use('*', notfoundRouter);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode)
    .send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
