const executeQuery = require('../utils').execQuery;

async function createMenu(body){
    if (body.id != null) {
        delete body.id;
    }

    //TODO : verify all params body
        
    Object.assign(body, createNewUserData());

    const 
        columns = [],
        params = [];
    
    for (let key in body) {
        columns.push(key);
        params.push(body[key]);
    }

    const query = 'INSERT INTO menu (' + columns.join() + ') VALUES (' + Array(params.length).join('?,') + '?)';

    await executeQuery(query, params);

    delete body.password;
    return body;
}


async function getMenu(queryParams) {
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

    let query = 'SELECT * FROM menu';
    if (columns.length > 0) {
        query += ' WHERE ' + columns.join('=? AND ') + '=? ALLOW FILTERING';
    }

    return (await executeQuery(query, params, options)).rows;
}

module.exports = {
    createMenu,
    getMenu
}