const mongoose = require('mongoose');
const Joi = require('joi');

//Create the model
const genreSchema = mongoose.model('Movie', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}));

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(2).required(),
    genre: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;