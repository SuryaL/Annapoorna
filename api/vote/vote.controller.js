const VoteService = require('./vote.service');
const _ = require('underscore');
const create = async function(req){

}

const find = async function(req){
    const query = _.clone(req.query);
    query.userId = req.user.id;
    const result = await MenuService.getMenu(query);
    return result;
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