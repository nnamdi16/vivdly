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
router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

//Add new genres and genres
router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
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
router.delete('/:id', async(req, res) => {
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