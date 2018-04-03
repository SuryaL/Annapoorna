const uuid = require('node-uuid');
const menuitems = require('./menu_items');
const MenuService = require('./menu.service');
const {execQuery} =  require('../../helpers/utils/db_utils');
async function recreateAllMenu(){
    await execQuery('truncate menu',[]);
    for(let m of menuitems){
        m.image = 'http://lorempixel.com/640/480/abstract';
        m.vegetarian = m.vegetarian == 'true';
        const {name,price,vegetarian,image,type} =m;
        const body = {name,price: price.toString(),vegetarian:!!vegetarian,image,type};
        Object.assign(body, MenuService.createNewMenuData());
        body.id = m.id;
        const menu = await MenuService.createMenu(body);
        // return menu;
    }
    // console.log(JSON.stringify(menuitems));
}

module.exports={
    recreateAllMenu
}