const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');

//Create the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },

  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique:true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
   
  },
  isAdmin: Boolean,
  roles: [],
  operations: []
});

//Add a method to the userSchema
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id:this._id, isAdmin:this.isAdmin}, config.get('jwtPrivateKey'));
  return token;
}; // This in an arrow function references the calling function. Use arrow functions for standalone functions. If we want to use methods that is part of an object you use regular functions.
//Create the model
const User= mongoose.model('User', userSchema);


function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email:Joi.string().min(5).max(255).required().email(),
    password:Joi.string().min(5).max(1024).required()
   
  };

  return Joi.validate(user, schema);
}


exports.User = User;
exports.validate = validateUser;