
const movies = require('./routes/genres');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/movies',movies);


//validate course function is used to validate the schema using Joi

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port  ${port} ...`));