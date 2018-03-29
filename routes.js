const express = require('express');
const router = express.Router();
const StatusController = require('./api/status/status.controller');
const StatusCheckService = require('./helpers/utils/status_check');

/**
 * Add current week to all requests
 * FIXME: change to per api basis
 */
router.use(StatusController.attachCurrentWeek);

StatusCheckService.checkStatus();

require('./auth')(router);
require('./api/user')(router);
require('./api/menu')(router);
require('./api/vote')(router);
require('./api/order')(router);
require('./api/status')(router);

// require('./helpers/fake_data/createFakeData');

module.exports = router;