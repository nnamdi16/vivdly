const jwt = require('jsonwebtoken');
const config = require('config');
const auth = (req, res, next) => {
  //next we use to pass control to the next middleware function in the request processing pipeline
  const token = req.header('x-auth-token');
  if(!token) return res.status(401).send('Access denied no token provided');
  //The client doesn't have the authentication credential to access this resource.

  try {
    const decoded = jwt.verify(token,config.get('jwtPrivateKey'));//Verify method will verify our json web token
  //If it is valid it would decode it and return the payload.
  req.user = decoded;
  next(); //Pass control to the next middleware function in the request processing pipeline.
  } catch (ex) {
    res.status(400).send('Invalid token');
  }

};

module.exports = auth;
