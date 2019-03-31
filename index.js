const mongoose = require('mongoose');
const movies = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/movies',movies);
app.use('/api/customers',customers);

mongoose.connect('mongodb://localhost/vivdly', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDb...'))
  .catch(err => console.error('Could not connect to Mongodb....',err));

//validate course function is used to validate the schema using Joi

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port  ${port} ...`));