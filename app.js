const express = require('express');
const app = express();
const config = require('./config');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');
const user = require('./api/user');


// static folder
app.use(express.static('public'));

// Routes setup
require('./api/routes')(app);

app.listen(config.port, _ => console.log(`Listening on ${config.port}`))


