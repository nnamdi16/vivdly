const mongoose = require('mongoose');
const Joi = require('joi');

//Create the model
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
});
const Genre = mongoose.model('Genre',genreSchema);

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(2).required(),
   
  };

  return Joi.validate(genre, schema);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;

