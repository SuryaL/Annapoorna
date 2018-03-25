const VoteService = require('./vote.service');
const _ = require('underscore');


const find = async function(req){
    const query = _.clone(req.query);
    query.user = (req.user.id).toString();
    const result = await VoteService.getVote(query);
    return result;
}

const update = async function(req){
}

const remove = async function(req){
};

const create = async function (req) {
    if(!req.body.dishes) {
        throw new Error ('Select atleast one dish');
    }
    let body = {dishes:req.body.dishes, user :req.user.id, week: req.body.week};
    // TODO: check week validity before insert
    Object.assign(body, VoteService.createNewVoteData());
    const votes = await VoteService.createVote(body);
    return votes;
}


const getMajority = async function(req){
    if(!req.query.week) return [];
    const results = await VoteService.getVote({week:req.query.week});
    if(!results) return [];
    
    const dishCounts = {};
    for(let result of results){
        result.dishes.forEach(dish_id => {
            if(!dishCounts.hasOwnProperty(dish_id)) dishCounts[dish_id]=0;
            dishCounts[dish_id]++;
        });;
    }

    //FIXME : NEED TO ADD THE CORRECT COUNTING IN CASE OF CLASHES
    const sortable = VoteService.sortObject(dishCounts);
    return sortable.map((d)=>d[0]).slice(0,5);
}

module.exports = {
    create,
    find,
    update, 
    remove,
    getMajority
}