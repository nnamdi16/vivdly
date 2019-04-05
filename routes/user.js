// const jwt = require('jsonwebtoken');
// const config = require('config');
const asyncMiddleware = require('../middleware/async');
const auth = require('../middleware/auth');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const mongoose = require('mongoose');
const {User} = require('../model/user');
const express = require('express');
const router = express.Router();


function validate(req) {
  const schema = {
    name: Joi.string().min(5).max(255).required(),
    email:Joi.string().min(5).max(255).required().email(),
    password:Joi.string().min(5).max(1024).required()
   
  };

  return Joi.validate(req, schema);
}

//Authentication is about validating the username and password while authorisation is about if the user has permission to access a resource or not.

router.get('/:me',auth, asyncMiddleware(async(req,res) => {
  const user = await User.findById(req.user._id).select('-password');
  //Isolate the password
  res.send(user);
}));
router.post('/', asyncMiddleware(async (req, res) => {
  const {error} = validate(req.body);                                                                                                   
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({
    email: req.body.email
  });
  if (user) return res.status(400).send('User already registered');
  user = new User(_.pick(req.body,['name','email','password']));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password,salt);
  await user.save();

  const token = user.generateAuthToken();
 
  res.header('x-auth-token',token).send(_.pick(user, ['_id','name','email']));
}));

/* Information Expert Principle
In Object Oriented Programming
-It means an object that have enough information and is an expert in a given area that object should be responsible in making decisions and performing tasks
*/


//Implement login out features on the client
//Token are like keys that gives a client access to protected api endpoints 
//Tokens should not be stored in plain text on your database rather you have to encrypt and hash it

module.exports = router;