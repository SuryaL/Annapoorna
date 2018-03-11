const service = require('./user.service');
const client = require('../../boundaries/cassandra').client;
const faker = require('./../../faker.js');
const create = async function(req, res, next) {

    


}

function createFakeData () {

    console.log(faker.getUser());
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

const find = async function(req, res, next) {
    let query = 'SELECT * FROM user';
    client.execute(query, [])
        .then(function(resp) {
            res.send(200, resp.rows);
        })
        .catch(err => console.log("err:", err))

}

const update = async function(req, res, next) {

}

const remove = async function(req, res, next) {

};



module.exports = {
    create,
    find,
    update,
    remove
}