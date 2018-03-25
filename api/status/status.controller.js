const StatusService = require('./status.service');
const _ = require('underscore');

const create = async function(req){

}

const find = async function(req){
    // const query = _.clone(req.query);
    // const result = await StatusService.week(query);
    // return result;
}

const getCurrentWeek = async function(){
    const result = await StatusService.activeweek();
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