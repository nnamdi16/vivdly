const winston = require('winston');

//It only catches errors that are part of the request processing pipeline. Outside the context of express, the error middleware would not be called.
module.exports = (err,req,res,next) => {
  //Log the Exception
  //Logging level determines the importance of the message we are going to log
  /*
  -error
  -warn
  -info
  -verbose
  -debug
  -silly
  */

  // winston.log('error',err.message);
  winston.error(err.message,err);
  
  res.status(500).send('Something failed');
}
