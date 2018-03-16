'use strict';

const uuid = require('uuid');
const co = require('co');

const handleReq = require('../../../util').handleReq;
const executeQuery = require('../../../util').executeQuery;
const coW = require('../../../util').coW;
const request = require('request');
const Promise = require('bluebird');

/**
 * create - create a new <%= name %> object
 * @param  {Object}   req  - the request object
 * @param  {Object}   res  - the response object
 * @param  {Function} next - go to the next middleware
 */

const create = coW(function* create(req) {
    if (req.body.id != null) {
        delete req.body.id;
    }

    req.body.id = uuid.v4();

    const columns = [];
    const params = [];
    const questions = [];

    Object.keys(req.body).forEach(key => {
        columns.push(key);
        params.push(req.body[key]);
        questions.push('?');
    })

    const query = 'INSERT INTO <%= name %> (' + columns.join() + ') VALUES (' + questions.join() + ')';

    return (yield executeQuery(query, params)).rows;
});

/**
 * find - find all the <%= name %> objects by query
 *        can call like so : /v/1/<%= name %>?options.pageState=<pageState>&active=true
 * @param  {Object}   req  - the request object
 * @param  {Object}   res  - the response object
 * @param  {Function} next - go to the next middleware
 */
const find = coW(function* find(req) {
    const options = req.query.options || {};
    if (req.query.options) {
        delete req.query.options;
    }

    const columns = [];
    const params = [];

    Object.keys(req.body).forEach(key => {
        columns.push(key);
        params.push(req.query[key]);
    })

    const query = 'SELECT * from <%= name %> WHERE ' + columns.join('=?,') + '=? ALLOW FILTERING';
    return (yield executeQuery(query, params, options)).rows;
});

/**
 * findOne - findOne of the <%= name %> object
 * @param  {Object}   req  - the request object
 * @param  {Object}   res  - the response object
 * @param  {Function} next - go to the next middleware
 */
const findOne = coW(function* findOne(req) {
    const query = 'SELECT * from <%= name %> WHERE id=?';
    return (yield executeQuery(query, [req.params.id])).rows[0];
});

/**
 * update - update a <%= name %> object
 * @param  {Object}   req  - the request object
 * @param  {Object}   res  - the response object
 * @param  {Function} next - go to the next middleware
 */
const update = coW(function* update(req) {
    if (req.body.id != null) {
        delete req.body.id;
    }

    const columns = [];
    const params = [];

    Object.keys(req.body).forEach(key => {
        columns.push(key);
        params.push(req.body[key]);
    })

    params.push(req.params.id);

    const query = 'UPDATE <%= name %> SET ' + columns.join('=?,') + '=? WHERE id=?';
    yield executeQuery(query, params);
    return 'Successfully Updated';
});

/**
 * remove - remove a <%= name %> object
 * @param  {Object}   req  - the request object
 * @param  {Object}   res  - the response object
 * @param  {Function} next - go to the next middleware
 */
const remove = coW(function* remove(req) {
    const query = 'DELETE from <%= name %> WHERE id=?';
    yield executeQuery(query, [req.params.id]);
    return 'Successfully Removed';
});
