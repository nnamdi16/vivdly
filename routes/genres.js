// const asyncMiddleware = require('../middleware/async');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
// const mongoose = require('mongoose');
const {validate,Genre} = require('../model/genre');
const express = require('express');
const router = express.Router();
// const Joi = require('joi');


//Create schema for the genres
// const genreschema = new mongoose.Schema({
//   name:{
//     type: String,
//     required:true,
//     minlength:5,
//     maxlength:25
//   }
// });



// const genres = [{
//     id: 1,
//     name: 'Fighting Temptation',
//     genre: 'Action'
//   },
//   {
//     id: 2,
//     name: 'Game of Thrones',
//     genre: 'Epic'
//   }
// ];


//Get all the genres
// router.get('/', async (req, res,next) => {
//  try {
//   const genres = await Genre.find().sort('name');
//   res.send(genres);
//  } catch (ex) {
//    //Pass all the control to our error handling middleware function
//    //Call next to pass control to the next middleware in the request processing pipeline.
//    next(ex);
//  }
// });
//npm module to monkey patch our route handler called express-async-errors. It moves control from our route handler to our error handling function
//Very popular error logging library is winston

router.get('/', async (req, res) => {
  //throw new Error('Could not get the genres');
   const genres = await Genre.find().sort('name');
   res.send(genres);
 });

//Add new genres and genres
router.post('/', auth, async (req, res) => {

  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  const genre= new Genre({
    // id: genres.length + 1,
    name: req.body.name,
    // genre: req.body.genre
  });

  // genres.push(Genre);
  await genre.save();
  res.send(genre);
});

router.put('/:id', auth, async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  const genre= await Genre.findByIdAndUpdate(req.params.id, {
    name: req.body.name
    //, genre: req.body.genre
  }, {  
    new: true
  }); //new:true to th get the update from the request.
  // const genre= genres.find(item => item.id === parseInt(req.params.id));

  if (!genre) return res.status(404).send(`The genrewith ID ${req.params.id} does not exist`);


  // Genre.name = req.body.name;
  // Genre.genre = req.body.genre;
  res.send(genre);
});

//delete one Genre
router.delete('/:id', [auth,admin], async(req, res) => {
  const genre= await Genre.findByIdAndRemove(req.params.id);
  // const genre= genres.find(item => item.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send(`The genre with the given ID ${req.params.id} does not exist`);
  // const index = genres.indexOf(Genre);
  // genres.splice(index, 1);
  res.send(genre);
});

//Get one Genre
router.get('/:id', async(req, res) => {
  const genre= await Genre.findById(req.params.id);
  // const genre= genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send(`The genre with the given ID ${req.params.id} does not exist`);
  res.send(genre);
});



module.exports = router;

//If we are using the promise then, we are to always use the catch block to handle exceptions
//If we are using async and await then we have to use the try catch block