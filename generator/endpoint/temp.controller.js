'use strict';

const uuid        = require ('uuid');
const error			  = require ('stax2/backend/errorHandling');
const client      = require ('stax2/backend/boundaries/cassandra').client;

/**
 * create - create a new <%= name %> object
 * @param  {Object}   req  - the request object
 * @param  {Object}   res  - the response object
 * @param  {Function} next - go to the next middleware
 */
exports.create = function (req, res, next) {
  if (req.body.id != null) {
    delete req.body.id;
  }

  req.body.id = uuid.v4();
  req.body.active = true;
  req.body.created = new Date().toISOString();
  req.body.modified = new Date().toISOString();
  req.body.modified_by = req.user.id.toISOString();

  var columns = [];
  var params = [];

  for (var key in req.body) {
    columns.push(key);
    params.push(req.body[key]);
  }

  var query = 'INSERT INTO <%= name %> (' + columns.join() + ') VALUES (' + Array(params.length).join('?,') + '?)';

  client.execute (query, params, { prepare : true })
  .then (function () {
    res.json(req.body);
    next();
  })
  .catch(error.handleRequestError(req, res, next));
};

/**
 * find - find all the <%= name %> objects by query
 * 				can call like so : /v/1/<%= name %>?options.pageState=<pageState>&active=true
 * @param  {Object}   req  - the request object
 * @param  {Object}   res  - the response object
 * @param  {Function} next - go to the next middleware
 */
exports.find = function (req, res, next) {
  var options = req.query.options || {};
  if (req.query.options) {
    delete req.query.options;
  }
  options.prepare = true;

  var columns = [];
  var params = [];

  for (var key in req.query) {
    columns.push (key);
    params.push (req.query[key]);
  }

  var query = 'SELECT * FROM <%= name %>';
  if (columns.length > 0) {
    query +=  ' WHERE ' + columns.join('=? AND ') + '=? ALLOW FILTERING';
  }
  client.execute (query, params, options)
  .then (function (results) {
    res.json (results);
    next();
  })
  .catch(error.handleRequestError(req, res, next));
};

/**
 * findOne - findOne of the <%= name %> object
 * @param  {Object}   req  - the request object
 * @param  {Object}   res  - the response object
 * @param  {Function} next - go to the next middleware
 */
exports.findOne = function (req, res, next) {
  var query = 'SELECT * FROM <%= name %> WHERE id=? AND active=? ALLOW FILTERING';
  client.execute(query, [req.params.id,true], { prepare : true })
  .then (function (results) {
    res.json (results.rows[0]);
    next();
  })
  .catch (error.handleRequestError(req, res, next));
};

/**
 * update - update a <%= name %> object
 * @param  {Object}   req  - the request object
 * @param  {Object}   res  - the response object
 * @param  {Function} next - go to the next middleware
 */
exports.update = function (req, res, next) {
  if (req.body.id != null) {
    delete req.body.id;
  }

  req.body.modified = new Date().toISOString();
  req.body.modified_by = req.user.id.toISOString();

  var columns = [];
  var params = [];

  for (var key in req.body) {
    columns.push(key);
    params.push(req.body[key]);
  }

  params.push (req.params.id);

  var query = 'UPDATE <%= name %> SET ' + columns.join('=?,') + '=? WHERE id=?';
  client.execute (query, params, { prepare : true })
  .then (function (results) {
    res.send(200);
    next();
  })
  .catch (error.handleRequestError(req, res, next));
};

/**
 * remove - inactivate a <%= name %> object
 * @param  {Object}   req  - the request object
 * @param  {Object}   res  - the response object
 * @param  {Function} next - go to the next middleware
 */
exports.remove = function (req, res, next) {
  var query = 'UPDATE <%= name %> SET active=? WHERE id=?';
  client.execute (query, [false,req.params.id], { prepare : true })
  .then (function () {
    res.send(200);
    next();
  })
  .catch (error.handleRequestError(req, res, next));
};
