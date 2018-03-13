const express = require('express');
const app = express();
const config = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');
const cassandra = require('./boundaries/cassandra');

/**
 * https://invis.io/86GAMP74JVA#/284548671_Login
 * https://invis.io/DRGAMJ7W3BJ#/284547007_Splash
 */

app.use(bodyParser.json());

app.use(cors({
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS".split(','),
    "allowedHeaders": "Content-Type,Authorization,Cache-Control,appversionnumber".split(','),
    "preflightContinue": true,
}));

app.use(function(req, res, next) {
    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.send(200);
    } else {
        //move on
        next();
    }
})


// Cassandra setup
cassandra.init(config.cassandra).then(function() {
    try {
        // Routes setup
        require('./routes')(app);
        // const fakeData = require('./helpers/fake_data/createFakeData.js');
    } catch (e) {
        console.log('\033[31m' + e.stack + '\033[0m');
    }
});

// static folder
app.use(express.static('dist'));

app.listen(config.port, _ => console.log(`Listening on ${config.port}`))