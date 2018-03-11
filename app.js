const express = require('express');
const app = express();
const config = require('./config');
const bodyParser = require('body-parser');

const cassandra   = require ('./boundaries/cassandra');
app.use(bodyParser.json());

// Cassandra setup
cassandra.init(config.cassandra).then(function () {
  try {
	// Routes setup
  require('./routes')(app);
  const fakeData = require('./api/data/createFakeData.js');  
  } catch (e) {
    console.log ('\033[31m' + e.stack + '\033[0m');
  }
});


// static folder
app.use(express.static('dist'));


app.listen(config.port, _ => console.log(`Listening on ${config.port}`))


