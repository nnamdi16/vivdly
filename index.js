const Joi = require('joi')
const express = require('express');
const app = express();

app.use(express.json());

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

//Create genre's of Movies

//Get all the movies
app.get('/api/movies', (req, res) => {
  res.send(movies);
});

//Add new movies and genres
app.post('/api/movies',(req,res) => {
const {error} = validateCourse(req.body);
if(error) return res.status(400).send(error.details[0].message);


const movie = {
  id : movies.length + 1,
  name:req.body.name,
  genre:req.body.genre
};

movies.push(movie);
res.send(movie);
});

//validate course function is used to validate the schema using Joi
function validateCourse(movie) {
  const schema = {
    name:Joi.string().min(2).required(),
    genre:Joi.string().min(3).required()
  };

  return Joi.validate(movie,schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port  ${port} ...`));