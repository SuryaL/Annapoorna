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

    let voteDetails = {};
    // console.log(votes.length);
    votes.forEach((vote) => {
        let week = (vote.week);
        let dishes = vote.dishes;
        let user = vote.user;
        let weekObject = {};

        if (voteDetails.hasOwnProperty(week)) {
            weekObject = voteDetails[week];
            let dishesObject = weekObject.dishes;
            dishes.forEach((dish) => {
                if (dishesObject.hasOwnProperty([dish])) {
                    let eachDishObj = dishesObject[dish];
                    eachDishObj.users.push(user);
                    console.log('')
                } else {
                    dishesObject[dish] = {
                        dishId: dish,
                        users: [user]
                    }
                }
            })
        } else {
            voteDetails[week] = {};
            weekObject = voteDetails[week];
            weekObject.dishes = {};
        }
    })
    // return voteDetails;

    let totalVotes = [];
    Object.keys(voteDetails).forEach((week) => {
        // console.log(vote);
        let dishes = voteDetails[week].dishes;
        let dishesArray = [];
        Object.keys(dishes).forEach((dish) => {
            // console.log(dish);
            let {
                dishId,
                users
            } = dishes[dish];
            let count = users.length;
            dishesArray.push({
                dishId,
                users,
                count
            })
        })
        totalVotes.push({
            week,
            dishes: dishesArray
        });

    })
    // return voteDetails;

    let menuList = await MenuService.getMenu({})
    let menuObj = {};
    menuList.forEach((item) => {
        menuObj[item.id] = item.name;
    })

    let userList = await UserService.getUsers({});

    let usersObj = {};
    userList.forEach(user => {
        usersObj[user.id] = user.first_name || user.email;
    })

    return {
        totalVotes,
        menuObj,
        usersObj
    };

    // let voteDetails = {};
    // console.log(votes);
    // votes.forEach((vote) => {
    //     let week = (vote.week);
    //     voteDetails[week] = voteDetails.hasOwnProperty(week) ? voteDetails[week] : [];

    //     voteDetails[week].push({
    //         dishes: vote.dishes,
    //         dishes: [],
    //         user: vote.user
    //     })
    // })

    // // return voteDetails;

    // let totalVotes = [];
    // Object.keys(voteDetails).forEach((week) => {
    //     weeklyDishes = {};
    //     allUserDishes = voteDetails[week];
    //     allUserDishes.forEach((userVotes) => {
    //         let user = userVotes.user;
    //         // console.log(' the user and votes are  ', user,userVotes.dishes.length);
    //         let userDishes = userVotes.dishes;
    //         // console.log(' the dishes are :',userDishes);
    //         userDishes.forEach((dish) => {
    //             weeklyDishes[dish] = weeklyDishes.hasOwnProperty([dish]) ?  weeklyDishes[dish] : [];
    //             // weeklyDishes['count'] = weeklyDishes.hasOwnProperty('count') ?  weeklyDishes[count]++ : 0;
    //             weeklyDishes[dish].push(user);
    //         })
    //     })
    //     totalVotes.push({week :week, dishes : weeklyDishes});
    // })

    // let finalVotes = [];
    // totalVotes.forEach((eachweek)=>{
    //     let UserVotes = [];
    //     let weeklyVotedDishes = eachweek.dishes;
    //     Object.keys(weeklyVotedDishes).forEach((key)=>{
    //         UserVotes.push(({
    //             dishId : key, userCount : weeklyVotedDishes[key].length
    //         }))
    //     })
    //     finalVotes.push({week :eachweek.week, dishes:UserVotes});
    // })

    // return finalVotes;
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