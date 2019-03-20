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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port  ${port} ...`));