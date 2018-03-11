const client = require('../../boundaries/cassandra').client;
const executeQuery = require('../utils').execQuery;
const MenuService = require('./menu.service');
const _ = require('underscore');

const create = async function(req){
	const body = _.clone(req.body);
	if (body.id != null) {
	    delete body.id;
	}
	
	//TODO : verify all params body
	    
	Object.assign(body, MenuService.createNewMenuData());
	
	const menu = await MenuService.createMenu(body);
	return menu
	console.log(err);        
}

const find = async function(req){
    const query = _.clone(req.query);
    const result = await MenuService.getMenu(query);
    return result
    console.log(err);
}

const update = async function(req){
    
}

const remove = async function(req){
    
};


module.exports = {
    create,
    find,
    update, 
    remove
}