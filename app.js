const express = require('express');
const app = express();
const config = require('./config');

app.use(express.static('public'));






app.listen(config.port, _ => console.log(`Listening on ${config.port}`))