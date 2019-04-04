//Import mongoose to build the database schema and Joi for validation

const mongoose = require('mongoose');
const Joi = require('joi');



//Create the rentals model
const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },

      isGold: {
        type: Boolean,
        default: false
      },

      phone: {
        type: Number,
        required: true,
        minlength: 5,
        maxlength: 11
      }
    }),
    required: true
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
      },

      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
      }

    }),
    required: true
  },

  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },

  dateReturned: {
    type: Date
  },

  rentalFee: {
    type: Number,
    min: 0
  }
});

//Create a mongoose model for Rental schema
const Rental = mongoose.model('Rental',rentalSchema);

const validateRental = (rental) => {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
    // customerId: Joi.string().required(),
    // movieId: Joi.string().required()
  };
  return Joi.validate(rental,schema);
};
//npm package for adding support to validating object Id's in Joi is joi-objectid
exports.Rental = Rental;
exports.validate = validateRental;