const uuid = require('node-uuid');
const menuitems = require('./menu_items');
const MenuService = require('./menu.service');
const {execQuery} =  require('../../helpers/utils/db_utils');
// async function recreateAllMenu(){
//     await execQuery('truncate menu',[]);
//     for(let m of menuitems){
//         m.image = 'http://lorempixel.com/640/480/abstract';
//         m.vegetarian = m.vegetarian == 'true';
//         const {name,price,vegetarian,image,type} =m;
//         const body = {name,price: price.toString(),vegetarian:!!vegetarian,image,type};
//         Object.assign(body, MenuService.createNewMenuData());
//         body.id = m.id;
//         const menu = await MenuService.createMenu(body);
//         // return menu;
//     }
//     // console.log(JSON.stringify(menuitems));
// }

/**
 * 
let temp = [
    ['Methi murgh', '9', 'true', 'Special'],
    ['Soya chunks veg pulav', '8', 'true', 'Regular'],
    ['Tawa pulav', '8', 'true', 'Regular'],
    ['Bhindi masala', '9', 'true', 'Special'],
    ['Methi dal', '7', 'true', 'Regular'],
    ['Methi chole', '7', 'true', 'Regular'],
    ['Gobhi matar masala', '7', 'true', 'Regular'],
    ['Tindora coconut stir fry', '9', 'true', 'Special'],
    ['Cabbage dal kootu', '7', 'true', 'Regular'],
    ['Chicken chettinand', '9', 'true', 'Special'],
    ['Paneer Methi Chaman', '9', 'true', 'Special']
];
let query = (name,price,vegetarian,type)=> `INSERT INTO menu (id,created,deleted,image,modified,modified_by,name,price,type,vegetarian) VALUES (${uuid.v4()},'2018-04-04T15:51:06.349Z',false,'http://lorempixel.com/640/480/abstract','2018-04-04T15:51:06.349Z',null,'${name}','${price}','${type}',${vegetarian});`

temp.forEach((v)=>{
console.log(query(...v));
})
 */

module.exports={
    // recreateAllMenu
}