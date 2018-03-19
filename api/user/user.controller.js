const UserService = require('./user.service');
const _ = require('underscore');

const create = async function (req) {
    const body = _.clone(req.body);
    if (body.id != null) {
        delete body.id;
    }
    console.log(UserService.createNewUserData());
    //TODO : verify all params body
    Object.assign(body, UserService.createNewUserData());
    body.modified_by = req.user.id;
    const user = await UserService.createUser(body);
    return user;
}


const find = async function (req) {
    const query = _.clone(req.query);
    const result = await UserService.getUsers(query);
    return result;
}

const update = async function (req) {
}

const remove = async function (req) {
};


module.exports = {
    create,
    find,
    update,
    remove
}