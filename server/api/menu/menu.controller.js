const client = require('../../boundaries/cassandra').client;
const executeQuery = require('../utils').execQuery;
const MenuService = require('./menu.service');
const _ = require('underscore');

const create = async function(req, res, next) {
    try {
        const body = _.clone(req.body);
        const menu = await MenuService.createMenu(body);
        res.json(menu);
        next();
    } catch (err) {
        res.send(500, new Error(err));
    }
}


const find = async function(req, res, next) {
    try {
        const query = _.clone(req.query);
        const result = await MenuService.getMenu(query);
        res.json(result);
        next();
    } catch (err) {
        res.send(500, new Error(err));
    }
}

const update = async function(req, res, next) {
	try {
	    const body = _.clone(req.body);
	    const menu = await MenuService.updateMenu(body);
	    res.json(menu);
	    next();
	} catch (err) {
	    res.send(500, new Error(err));
	}
}

const remove = async function(req, res, next) {
};

module.exports = {
    create,
    find,
    update,
    remove
}