const service = require('./user.service');
const client = require('../../boundaries/cassandra').client;
const executeQuery = require('../utils').execQuery;

const create = async function(req, res, next) {


}

const find = async function(req, res, next) {
    let query = 'SELECT * FROM user';
    // client.execute(query, [])
    //     .then(function(resp) {
    //         res.send(200, resp.rows);
    //     })
    //     .catch(err => console.log("err:", err))

    let result = await executeQuery(query, []);
    res.status(200).send(result);

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