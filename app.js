const express    = require('express');
const app        = express();
const config     = require('./config');
const requestify = require('./helpers/utils/requestify');
const cassandra  = require('./boundaries/cassandra');
const email      = require ('./helpers/email');
const uuid = require('node-uuid');
const compression = require('compression')

/**
 * request related middlewares
 */
requestify(app);


/**
 * gzip
 */
app.use(compression())


/**
 * Serve static folders
 */
app.use(express.static('dist'));



/**
 * Cassandra setup
 * + 
 * Define API routes
 */
cassandra.init(config.cassandra)
    .then(_ => app.use(config.base_api_path, require('./routes')))
    .catch(console.error)


/**
 * email init
 */
email.init(config);


/**
 * App listen and 
 * catch unhandled exceptions
 */

app.listen(config.port, _ => console.log(`Listening on ${config.port}`))
process.on('unhandledRejection', (reason, p) => console.log('Unhandled Rejection at:', p, 'reason:', reason))