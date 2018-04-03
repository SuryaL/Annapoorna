const MenuService = require('./menu.service');
const MenuCreate = require('./menu_create');
const _ = require('underscore');

// MenuCreate.recreateAllMenu();

/**
 * 
 * name : string, 
 * price : string, 
 * vegetarian: bool, 
 * image?: string
 * 
 */
const create = async function (req) {
    const {name,price,vegetarian,image,type} = req.body;
    //TODO: check if valid params
    const body = {name,price: price.toString(),vegetarian:!!vegetarian,image,type};
    
    Object.assign(body, MenuService.createNewMenuData());
    const menu = await MenuService.createMenu(body);
    return menu;
}


const find = async function (req) {
    const query = _.clone(req.query);
    const result = await MenuService.getMenu(query);
    return result;
}

const update = async function (req) {
    const {name,price,vegetarian,image,id,created} = req.body;
    //TODO: check if valid params
    // must id,created

    const menu = await MenuService.updateMenu({name,price,vegetarian,image,id,created});
    return menu;
}

const remove = async function (req) {
    const {id} = req.params;
    //TODO: check if valid params
    // must id
    await MenuService.removeMenu(id);
    return;
};

module.exports = {
    create,
    find,
    update,
    remove
}