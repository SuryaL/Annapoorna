const service = require('./user.service');
const client = require('../../boundaries/cassandra').client;
const executeQuery = require('../utils').execQuery;
const UserService = require('./user.service');
const _ = require('underscore');

const create = async function(req) {

        const body = _.clone(req.body);
        if (body.id != null) {
            delete body.id;
        }
    
        //TODO : verify all params body
            
        Object.assign(body, UserService.createNewUserData());
    
        const user = await UserService.createUser(body);
        return user
        console.log(err);        
}

const find = async function(req) {
        const query = _.clone(req.query);
        const result = await UserService.getUsers(query);
        return result
        console.log(err);
        
}

const update = async function(req) {
}

const remove = async function(req) {
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