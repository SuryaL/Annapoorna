const express = require('express');
const router = express.Router();

require('./auth')(router);
require('./api/user')(router);
require('./api/menu')(router);
require('./api/vote')(router);
require('./api/order')(router);
require('./api/status')(router);

module.exports = router;