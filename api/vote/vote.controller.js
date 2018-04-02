const VoteService = require('./vote.service');
// const MenuService = require('../menu/menu.sevice');
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
    if(!req.current_week || !req.body.week || req.body.week !=  req.current_week.week || !!req.current_week.voting_status){
        throw new Error('Failed')
    }

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
        });
    }

    //FIXME : NEED TO ADD THE CORRECT COUNTING IN CASE OF CLASHES
    const sortable = VoteService.sortObject(dishCounts);

    //FIXME : If not enough votes, then pick random
    return sortable.map((d)=>d[0]).slice(0,5);
}

// const getFinalMajority = async function (req){
//     let sorted = await getMajority(req);
//     if(sorted.length != 5){
//         // let menu = await MenuService.getMenu();

//         // notify admin?
//     }
// }

module.exports = {
    create,
    find,
    update, 
    remove,
    getMajority
}