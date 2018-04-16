const {
    execQuery
} = require('../../helpers/utils/db_utils');
const uuid = require('node-uuid');
const UserService = require('../user/user.service');
const MenuService = require('../menu/menu.service');



function createNewVoteData() {
    const body = {};

    body.created = new Date().toISOString();
    body.modified = new Date().toISOString();
    // body.week = new Date().toISOString(); // for now

    //FIXME: need authentication middleware added
    // body.modified_by = req.user.id.toString();
    return body
}

async function createVote(body) {
    //TODO : verify all params body
    const
        columns = [],
        params = [];

    for (let key in body) {
        columns.push(key);
        params.push(body[key]);
    }

    const query = 'INSERT INTO voting (' + columns.join() + ') VALUES (' + Array(params.length).join('?,') + '?)';
    await execQuery(query, params);
    return body;
}


async function getVote(queryParams) {
    const options = queryParams.options || {};

    if (queryParams.options) {
        delete queryParams.options;
    }

    // FIXME: not deleted only service
    const columns = [];
    const params = [];

    for (let key in queryParams) {
        columns.push(key);
        params.push(queryParams[key]);
    }

    let query = 'SELECT * FROM voting';
    if (columns.length > 0) {
        query += ' WHERE ' + columns.join('=? AND ') + '=? ALLOW FILTERING';
    }
    return (await execQuery(query, params, options)).rows;
}

async function updateVote(body) {

    const userId = body.user;
    const created = body.created;
    if (!userId || !created) throw new Error('Update params are missing');

    delete body.user;
    delete body.created;

    const
        columns = [],
        params = [];

    for (let key in body) {
        columns.push(key);
        params.push(body[key]);
    }

    params.push(userId);
    params.push(created);

    const query = 'UPDATE voting SET ' + columns.join('=?,') + ' WHERE user = ? AND created = ?';

    await execQuery(query, params);
    return body;
}

function sortObject(dishCounts) {
    let sortable = [];
    for (let dish_id in dishCounts) {
        sortable.push([dish_id, dishCounts[dish_id]]);
    }
    sortable.sort(function(a, b) {
        return a[1] - b[1];
    });
    return sortable
    // if(sortable.length>5){
    //     // sortable.forEach((s)=>{
    //     //     if(!counts.hasOwnProperty(dishCounts[dish_id])) counts[dishCounts[dish_id]]=[];
    //     //     counts[dishCounts[dish_id]].push(dish_id)
    //     // })
    //     return sortable.map((d)=>d[0]);
    // }else{
    //     return sortable.map((d)=>d[0]);
    // }
}

async function removeVote(id) {

}


async function getAllUserVotes(user) {

    const query = 'Select * from voting;'
    const found = await execQuery(query, []);
    return found.rows
}

async function getAllVotesWeekly(week) {
    if (!week) {
        throw new Error('Invalid week');
    }
    const query = 'Select * from voting where week = ?';
    const found = await execQuery(query, [week]);
    return found.rows
}

async function formatVotesHistory(votes) {
    const menuList = await MenuService.getMenu({})
    const menuObj = menuList.reduce((menuObj,menu_item) => {
        menuObj[menu_item.id] = menu_item.name;
        return menuObj
    },{})

    const userList = await UserService.getUsers({});
    const usersObj = userList.reduce((usersObj, user) => {
        usersObj[user.id] = user.first_name || user.email;
        return usersObj;
    },{})

    const voteDetails = {};
    votes.forEach((vote) => {
        const {week, dishes, user, assure} = vote;
        if (!voteDetails.hasOwnProperty(week)) {
            voteDetails[week] = {
                dishes:{},
                week
            }
        }
        (dishes||[]).forEach((dish) => {
            dish = dish.toString();
            // console.log(voteDetails[week].dishes, dish);
            if (!voteDetails[week].dishes[dish]) {
                voteDetails[week].dishes[dish] = {dish, dish_name:menuObj[dish], users:[], vote:0, assure:0};
            }
            voteDetails[week].dishes[dish].vote += 1;
            voteDetails[week].dishes[dish].assure += +((assure||{})[dish] || 0);
            usersObj[user.toString()] && voteDetails[week].dishes[dish].users.push({
                id:user.toString(),
                name:usersObj[user.toString()],
                assure : voteDetails[week].dishes[dish].assure 
            });
        })
    })

    
    let voteResp = [];
    Object.keys(voteDetails).forEach((week)=>{
        let dishesArr =[];
        Object.keys(voteDetails[week].dishes).forEach((dish)=>{
            dishesArr.push(voteDetails[week].dishes[dish]);
        })
        voteDetails[week].dishes = dishesArr;
        voteResp.push(voteDetails[week]);
    })
    return voteResp
}



async function formatVotingDetails() {

}

module.exports = {
    createVote,
    getVote,
    updateVote,
    removeVote,
    createNewVoteData,
    sortObject,
    getAllUserVotes,
    formatVotesHistory,
    getAllVotesWeekly,
    formatVotingDetails
}