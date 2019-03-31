// const mongoose = require('mongoose');
const {validate,Movie} = require('../model/genre');
const express = require('express');
const router = express.Router();
// const Joi = require('joi');


//Create schema for the movies
// const movieSchema = new mongoose.Schema({
//   name:{
//     type: String,
//     required:true,
//     minlength:5,
//     maxlength:25
//   }
// });



// const movies = [{
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

//Get all the movies
router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name');
  res.send(movies);
});

//Add new movies and genres
router.post('/', async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  let movie = new Movie({
    // id: movies.length + 1,
    name: req.body.name,
    genre: req.body.genre
  });

  // movies.push(movie);
  movie = await movie.save();
  res.send(movie);
});

router.put('/:id', async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  const movie = await Movie.findByIdAndUpdate(req.params.id, {
    name: req.body.name, genre: req.body.genre
  }, {  
    new: true
  }); //new:true to th get the update from the request.
  // const movie = movies.find(item => item.id === parseInt(req.params.id));

  if (!movie) return res.status(404).send(`The movie with ID ${req.params.id} does not exist`);


  // movie.name = req.body.name;
  // movie.genre = req.body.genre;
  res.send(movie);
});

//delete one movie
router.delete('/:id', async(req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  // const movie = movies.find(item => item.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send(`The movie with the given ID ${req.params.id} does not exist`);
  // const index = movies.indexOf(movie);
  // movies.splice(index, 1);
  res.send(movie);
});

//Get one movie
router.get('/:id', async(req, res) => {
  const movie = await Movie.findById(req.params.id);
  // const movie = movies.find(c => c.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send(`The genre with the given ID ${req.params.id} does not exist`);
  res.send(movie);
});



module.exports = router;