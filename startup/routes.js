const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/user');
const auth = require('../routes/auth');
const express = require('express');
const error = require('../middleware/error');

module.exports = (app) => {
  //Install the endpoints or register our middleware functions. Error middleware function is registered after all the middleware functions.
  app.use(express.json());
  app.use('/api/genres', genres);
  app.use('/api/customers', customers);
  app.use('/api/movies', movies);
  app.use('/api/rentals', rentals);
  app.use('/api/users', users);
  app.use('/api/auth', auth);

  //Add all the logic for handling errors in our application.
  app.use(error); //The function error is not called but we just passed a reference to error.
};