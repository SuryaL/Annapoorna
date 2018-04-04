const VoteService = require('./vote.service');
const _ = require('underscore');
const MenuService = require('../menu/menu.service');
const RNG = require('../../helpers/utils/RNG');

const find = async function(req) {
    const query = _.clone(req.query);
    query.user = (req.user.id).toString();
    const result = await VoteService.getVote(query);
    return result;
}

const update = async function(req) {}

const remove = async function(req) {};

const create = async function(req) {
    if(!req.body.dishes) {
        throw new Error('Select atleast one dish');
    }
    let body = { dishes: req.body.dishes, user: req.user.id, week: req.body.week };
    if(!req.current_week || !req.body.week || req.body.week != req.current_week.week || !!req.current_week.voting_status) {
        throw new Error('Failed')
    }

    // TODO: check week validity before insert
    Object.assign(body, VoteService.createNewVoteData());
    const votes = await VoteService.createVote(body);
    return votes;
}


const getMajority = async function(req) {
    if(!req.query.week) return [];
    const results = await VoteService.getVote({ week: req.query.week });
    let seed = new Date(req.query.week).getTime() + results.length;
    let rng = new RNG(seed);

    if(!results) return [];

    const dishCounts = {};
    let menuitems = await MenuService.getMenu({});

    for(let result of results) {
        result.dishes.forEach(dish_id => {
            if(!dishCounts.hasOwnProperty(dish_id)) dishCounts[dish_id] = 0;
            dishCounts[dish_id]++;
        });
    }

    menuitems.forEach(menuitem => {
        if(!dishCounts.hasOwnProperty(menuitem.id)) {
            dishCounts[menuitem.id] = 0;
        }
    })

    //FIXME : INEFFICIENT ALGO (needs rewrite)
    const sortable = VoteService.sortObject(dishCounts).reverse();

    let val = null,
        vals_arrange = [],
        vals_arrange_obj = {};
    Object.keys(dishCounts).forEach((item) => {
        let temp_val = dishCounts[item];
        if(!vals_arrange_obj[temp_val]){
            vals_arrange_obj[temp_val]={ val:temp_val, dishes: [] };
        }
        vals_arrange_obj[temp_val].dishes.push(item)
    });
    
    Object.keys(vals_arrange_obj).sort().reverse().forEach((it)=>{
        vals_arrange.push(vals_arrange_obj[it])
    });

    vals_arrange.forEach((val_item) => {
        val_item.dishes = shuffle(val_item.dishes, rng);
    })

    let full_sortable = vals_arrange.reduce((p, c) => {
        p = p.concat(c.dishes);
        return p;
    }, [])

    let top = full_sortable.slice(0, 5);

    return top;
}

function shuffle(array, rng) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while(0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = rng.nextRange(0, array.length); //Math.floor(rng.nextRange(0,1) * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
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