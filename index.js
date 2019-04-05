const config = require('config');
const auth = require('./routes/auth');
const Joi = require('joi');
Joi.objectId = require('joi-objectId')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/user');
const express = require('express');
const app = express();
const error = require('./middleware/error');


if(!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined ');
  process.exit(1); //global variable in node ...0 means success while 1 means exit the process in case of an error.
}

//Install the endpoints or register our middleware functions. Error middleware function is registered after all the middleware functions.
app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
app.use('/api/users',users);
app.use('/api/auth',auth);

//Add all the logic for handling errors in our application.
app.use(error);//The function error is not called but we just passed a reference to error.



mongoose.connect('mongodb://localhost/vivdly')
  .then(() => console.log('Connected to MongoDb...'))
  .catch(err => console.error('Could not connect to Mongodb....',err));

//validate course function is used to validate the schema using Joi

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port  ${port} ...`));