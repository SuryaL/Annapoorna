const executeQuery = require('../utils').execQuery;

function createNewMenuData(){
    const body = {};
    body.id = uuid.v4();
    body.active = true;
    body.deleted = false;
    body.created = new Date().toISOString();
    body.modified = new Date().toISOString();
    body.modified_by = req.menu.id.toString();
    return body
}

async function createMenu(body){
   
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
    getMenu,
    createNewMenuData
}