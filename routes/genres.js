const express = require('express');
const router = express.Router();
const Joi = require('joi');

//Create genre's of Movies
//Create schema for the movies
const movies = [{
    id: 1,
    name: 'Fighting Temptation',
    genre: 'Action'
  },
  {
    id: 2,
    name: 'Game of Thrones',
    genre: 'Epic'
  }
];

//Get all the movies
router.get('/', (req, res) => {
  res.send(movies);
});

//Add new movies and genres
router.post('/', (req, res) => {
  const {
    error
  } = validateMovies(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  const movie = {
    id: movies.length + 1,
    name: req.body.name,
    genre: req.body.genre
  };

  movies.push(movie);
  res.send(movie);
});

router.put('/:id', (req, res) => {
  const movie = movies.find(item => item.id === parseInt(req.params.id));

  if (!movie) return res.status(404).send(`The movie with ID ${req.params.id} does not exist`);

  const {
    error
  } = validateMovies(req.body);
  if(error) return res.status(404).send(error.details[0].message);
  movie.name = req.body.name;
  movie.genre = req.body.genre;
  res.send(movie);
});

//delete one movie
router.delete('/:id', (req, res) => {
  const movie = movies.find(item => item.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send(`The movie with the given ID ${req.params.id} does not exist`);
  const index = movies.indexOf(movie);
  movies.splice(index, 1);
  res.send(movie);
});

//Get one movie
router.get('/:id',(req,res) =>{
  const movie = movies.find(c => c.id === parseInt(req.params.id));
  if(!movie) return res.status(404).send(`The genre with the given ID ${req.params.id} does not exist`);
  res.send(movie);
});

function validateMovies(movie) {
  const schema = {
    name:Joi.string().min(2).required(),
    genre:Joi.string().min(3).required()
  };

  return Joi.validate(movie,schema);
}

module.exports = router;