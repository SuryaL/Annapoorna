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


/** 
 * Attach current week to req as a middleware to all requests
 * 
 * Note: change to per api basis
*/

const attachCurrentWeek = (req, res, next) => {
    getCurrentWeek()
        .then((current_week) => {
            req.current_week = current_week;
            next();
        }).catch((err)=>{
            req.current_week = null;
            console.error(err);
            next();
        })
}


module.exports = {
    create,
    find,
    update, 
    remove,
    attachCurrentWeek,
    getCurrentWeek
}