require('express-async-errors');
require('winston-mongodb');
const winston = require('winston');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectId')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const app = express(); 
require('./startup/routes')(app);

//An event emitter is an object that can emit or publish events.We use on to subscribe to an event

//Handling uncaught Exceptions- subscribing to uncaught exception of the process object.
//This only works with synchronous codes.

// process.on('uncaughtException',(ex) =>{
//   // console.log('WE GOT AN UNCAUGHT EXCEPTION');
//   //logging the error using winston
//   winston.error(ex.message,ex);
//   process.exit(1);
// });

//login message to mongodb, you would use winston mongodb
//Winston has a transport; a storage device for our logs -> they are console, for logging messages on the console, file and http for calling an http endpoint  for logging messages

winston.add(winston.transports.File,{filename:'logfile.log'});

winston.add( winston.transports.MongoDB,{db:'mongodb://localhost/vivdly', level: 'info'});

// throw new Error('Something failed during Startup');

winston.handleExceptions(new winston.transports.File({filename: 'uncaughtExceptions.log'}))

//Unhandled rejection
process.on('unhandledRejection',(ex) =>{
  // console.log('WE GOT AN UNHANDLED REJECTION');
  //logging the error using winston
  // winston.error(ex.message,ex);
  // process.exit(1);
  throw ex;
});

// const p = Promise.reject(new Error('Something failed miserably'));

// p.then(() => console.log('Done'));



if(!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined ');
  process.exit(1); //global variable in node ...0 means success while 1 means exit the process in case of an error.
}

mongoose.connect('mongodb://localhost/vivdly')
  .then(() => console.log('Connected to MongoDb...'))
  .catch(err => console.error('Could not connect to Mongodb....',err));

//validate course function is used to validate the schema using Joi

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port  ${port} ...`));