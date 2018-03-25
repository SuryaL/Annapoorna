const {
    execQuery
} = require('../../helpers/utils/db_utils');
const uuid = require('node-uuid');

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
module.exports = {
    createVote,
    getVote,
    updateVote,
    removeVote,
    createNewVoteData,
    sortObject
}