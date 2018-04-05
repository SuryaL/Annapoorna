const { execQuery } = require('../../helpers/utils/db_utils');
const uuid = require('uuid');
const emailService = require('../../helpers/email');
const HelperUtils = require('../../helpers/utils/helper_utils');

function createNewUserData() {
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
async function createUser(body) {
    console.log(body);
    const
        columns = [],
        params = [];

    for(let key in body) {
        columns.push(key);
        params.push(body[key]);
    }

    const query = 'INSERT INTO user (' + columns.join() + ') VALUES (' + Array(params.length).join('?,') + '?)';

    await execQuery(query, params);

    delete body.password;
    return body;
}


async function getUsers(queryParams) {
    console.log('queryParams :', queryParams)
    const options = queryParams.options || {};
    if(queryParams.options) {
        delete queryParams.options;
    }

    const columns = [];
    const params = [];

    for(let key in queryParams) {
        columns.push(key);
        params.push(queryParams[key]);
    }

    let query = 'SELECT * FROM user';
    if(columns.length > 0) {
        query += ' WHERE ' + columns.join('=? AND ') + '=? ALLOW FILTERING';
    }
    // console.log(query, params);
    return(await execQuery(query, params, options)).rows;
}

async function getUser(queryParams) {
    let founduser = (await getUsers(queryParams))[0];
    return founduser || null;
}

/**
 * example
 * 
 *     UserService.sendMailToUsers({user_ids:['311566a5-b290-4c36-98f2-b8032cce2588'], user_types:['cook','admin']})('voteenabled', {
        deadline:' dallastime(data.voting_deadline)'
    })
 */
function sendMailToUsers(filters = {}) {
    // TODO : check (need to be arrays)
    let filter_user_types = (filters.user_types||[]).length ? filters.user_types : null;
    let filter_user_ids = (filters.user_ids||[]).length ? filters.user_ids : null;
    
    return async function(email_type, options = {}){
        // FIXME: Create query based instead of fetching all users
        let users = await getUsers({});
        
        let toSendUsers = users.filter((user)=>{
            let bool1 = true, bool2=true;
            if(!!filter_user_ids){
                bool1 = HelperUtils.hasArrayMatching(filter_user_ids, [user.id.toString()])
            }
            if(!!filter_user_types){
                bool2 = HelperUtils.hasArrayMatching(user.type, filter_user_types)
            }
            return bool1 && bool2
        })
       
        for(let user of toSendUsers) {
            let { first_name, email } = user;
            let data = Object.assign({ first_name, email }, options);
            // console.log(user);
            // await emailService.send('surysunny17@gmail.com', email_type, {user:data}, [])
            await emailService.send(email, email_type, { user: data }, [])
        }
    }
}




module.exports = {
    sendMailToUsers,
    createUser,
    getUsers,
    getUser,
    createNewUserData
}