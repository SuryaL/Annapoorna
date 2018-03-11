const MenuService = require('./menu.service');
const _ = require('underscore');

const create = async function (req) {
    const body = _.clone(req.body);
    const menu = await MenuService.createMenu(body);
    return menu;
}


const find = async function (req) {
    const query = _.clone(req.query);
    const result = await MenuService.getMenu(query);
    return result;
}

const update = async function (req) {
    const body = _.clone(req.body);
    const menu = await MenuService.updateMenu(body);
    return menu;
}

const remove = async function (req) {
};

module.exports = {
    create,
    find,
    update,
    remove
}