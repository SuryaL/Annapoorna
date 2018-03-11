const client = require('../../boundaries/cassandra').client;
const executeQuery = require('../utils').execQuery;
const UserService = require('./user.service');
const _ = require('underscore');

const create = async function(req, res, next) {
    try {
        const body = _.clone(req.body);
        const user = await UserService.createUser(body);
        res.json(user);
        next();
    } catch (err) {
        res.send(500, new Error(err));
    }
}


const find = async function(req, res, next) {
    try {
        const query = _.clone(req.query);
        const result = await UserService.getUsers(query);
        res.json(result);
        next();
    } catch (err) {
        res.send(500, new Error(err));
    }
}

const update = async function(req, res, next) {
}

const remove = async function(req, res, next) {
};

function createFakeData() {
    let user = faker.getUser();
    const columns = [];
    const params = [];
    const questions = [];
    Object.keys(user).forEach(key => {
        columns.push(key);
        params.push(user[key]);
        questions.push('?');
    })

    // const query = 'INSERT INTO user (' + columns.join() + ') VALUES (' + questions.join() + ')';
    // let result = yield executeQuery(query, params)
}

module.exports = {
    create,
    find,
    update,
    remove
}