const {execQuery} =  require('../../helpers/utils/db_utils');
const uuid = require('uuid');

function createNewUserData(){
    const body = {};
    body.id = uuid.v4();
    body.active = true;
    body.deleted = false;
    body.created = new Date().toISOString();
    body.modified = new Date().toISOString();
    body.super = false;
    body.type = ['user'];
    return body
}
/**
 * {
        "id": "ebe66da1-f4c2-4a1f-8d47-3cc5fea49646",
        "accessed_mobile": "2018-03-10T09:45:39.946Z",
        "accessed_portal": "2018-03-11T03:55:55.426Z",
        "active": true,
        "created": "2018-03-10T22:54:27.619Z",
        "deleted": true,
        "email": "Cassidy4@yahoo.com",
        "first_name": "Zion",
        "image": "http://lorempixel.com/640/480/abstract",
        "last_name": "Konopelski",
        "modified": "2018-03-10T16:18:38.673Z",
        "modified_by": "46ed49ba-5dae-4107-9a9e-0b50113b5bd1",
        "password": "0CudVBjwTSYB7Cw",
        "phone": "1-837-875-9307 x24271",
        "super": true,
        "type": ["user"]
    }
 */
async function createUser(body){
    console.log(body);
    const 
        columns = [],
        params = [];
    
    for (let key in body) {
        columns.push(key);
        params.push(body[key]);
    }

    const query = 'INSERT INTO user (' + columns.join() + ') VALUES (' + Array(params.length).join('?,') + '?)';

    await execQuery(query, params);
    
    delete body.password;
    return body;
}


async function getUsers(queryParams) {
    console.log('queryParams :',queryParams)
    const options = queryParams.options || {};
    if (queryParams.options) {
        delete queryParams.options;
    }

    const columns = [];
    const params = [];

    for (let key in queryParams) {
        columns.push(key);
        params.push(queryParams[key]);
    }

    let query = 'SELECT * FROM user';
    if (columns.length > 0) {
        query += ' WHERE ' + columns.join('=? AND ') + '=? ALLOW FILTERING';
    }
    // console.log(query, params);
    return (await execQuery(query, params, options)).rows;
}

async function getUser(queryParams) {
    let founduser =  (await getUsers(queryParams))[0];
    return founduser|| null;
}


module.exports = {
    createUser,
    getUsers,
    getUser,
    createNewUserData
}