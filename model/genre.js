const mongoose = require('mongoose');
const Joi = require('joi');

//Create the model
const Movie = mongoose.model('Movie', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 25
  }
}));

function validateMovies(movie) {
  const schema = {
    name: Joi.string().min(2).required(),
    genre: Joi.string().min(3).required()
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovies;