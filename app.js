const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const notfoundRouter = require('./routes/notfound');

const app = express();

mongoose.connect('mongodb://localhost:27017/news', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});


app.use('/api/users', require('./routes/users'));
app.use('/api/articles', require('./routes/articles'));

app.use('*', notfoundRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});



