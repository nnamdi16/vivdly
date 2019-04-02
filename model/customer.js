const mongoose = require('mongoose');
const Joi = require('joi');
//Create the model and schema
const Customer = mongoose.model('Customer', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }, 

  isGold: {
    type: Boolean,
    default:false
  },

  phone: {
    type: Number,
    required: true,
    minlength: 5,
    maxlength: 11
  }, 
}));


function validateCustomers(customer) {
  const schema = {
    name: Joi.string().min(5).required().max(50),
    phone: Joi.string().min(5).required().max(50),
    isGold:Joi.boolean()
    
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomers;