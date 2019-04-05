const asyncMiddleware = require('../middleware/async');
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const mongoose = require('mongoose');
const {User} = require('../model/user');
const express = require('express');
const router = express.Router();


function validate(req) {
  const schema = {
    email:Joi.string().min(5).max(255).required().email(),
    password:Joi.string().min(5).max(1024).required()
   
  };

  return Joi.validate(req, schema);
}

router.post('/', asyncMiddleware(async (req, res) => {
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({
    email: req.body.email
  });
  if (!user) return res.status(400).send('Invalid email or password');
   //bcrypt compare method used to compare a plain text password and a hashed password
  //Compare method a plain text password with a hashed password

  const validPassword =  bcrypt.compare(req.body.password,user.password);
  if(!validPassword) return res.status(400).send('Invalid email or password');

  //Insert your jwt private key and payload..Store private key in your environment variable.
  // const token = jwt.sign({ _id:user._id}, config.get('jwtPrivateKey'));

  const token = user.generateAuthToken();

  res.send(token);
  //JSON web Token is a long string that identifies the user.It is like your driver's license or your password.
  /* When the client logins in on the server, the Json Web token is generated and sent to the client to be used anytime they call any of the endpoints... It's the client's Id
  The payload includes public properties about the user
  The digital signature is created based on the content of the JSON web token along with secret or private key*/
}));

/* config  is node package used to store the configuration settings of our applications in json or environment variable*/

module.exports = router;