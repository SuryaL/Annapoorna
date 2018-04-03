const UserService = require('./user.service');
const _ = require('underscore');
const email = require('../../helpers/email');

const create = async function(req) {
    const body = _.clone(req.body);
    if(body.id != null) {
        delete body.id;
    }
    if(!req.body.type || !req.body.email) {
        throw new Error('Required params missing');
    }
    const foundUser = (await UserService.getUser({ email: body.email }));
    if(!!foundUser) {
        throw new Error('User exists');
    }

    // PROCEED
    Object.assign(body, UserService.createNewUserData());
    body.modified_by = req.user.id;
    body.active = true;
    body.type = [req.body.type];
    body.email = req.body.email;

    let resp = await UserService.createUser(body);
    email.send(body.email, 'welcome', { user: { email: body.email, } }, []);
    return resp;
}


const find = async function(req) {
    const query = _.clone(req.query);
    const result = await UserService.getUsers(query);
    return result;
}


// const findOne = async function (req) {
//     const query = _.clone(req.query);
//     query.email = req.body.email;
//     const result = await UserService.getUsers(query);
//     return result;
// }

const update = async function(req) {}

const remove = async function(req) {};


module.exports = {
    create,
    find,
    update,
    remove
}