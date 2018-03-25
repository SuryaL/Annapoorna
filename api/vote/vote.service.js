const {execQuery} =  require('../../helpers/utils/db_utils');
const uuid = require('node-uuid');

function createNewVoteData(){
    const body = {};
    
    body.created = new Date().toISOString();
    body.modified = new Date().toISOString();
    // body.week = new Date().toISOString(); // for now

    //FIXME: need authentication middleware added
    // body.modified_by = req.user.id.toString();
    return body
}

async function createVote(body){
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
    const userId = queryParams.userId;
    if (!userId) throw new Error('Prams are missing');
    
    if (queryParams.options) {
        delete queryParams.options;
        
    }
    if (queryParams.userId) {
        delete queryParams.userId;
        
    }

    // FIXME: not deleted only service
    const columns = ['user'];
    const params = [userId];

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


async function removeVote(id) {
    
}
module.exports = {
    createVote,
    getVote,
    updateVote,
    removeVote,
    createNewVoteData
}