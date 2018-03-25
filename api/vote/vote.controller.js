const VoteService = require('./vote.service');
const _ = require('underscore');


const find = async function(req){
    const query = _.clone(req.query);
    query.userId = (req.user.id).toString();
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



module.exports = {
    create,
    find,
    update, 
    remove
}