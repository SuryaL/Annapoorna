const executeQuery = require('../utils').execQuery;

async function createMenu(body){
    if (body.id != null) {
        delete body.id;
    }

    //TODO : verify all params body
        
    const 
        columns = [],
        params = [];
    
    for (let key in body) {
        columns.push(key);
        params.push(body[key]);
    }

    const query = 'INSERT INTO menu (' + columns.join() + ') VALUES (' + Array(params.length).join('?,') + '?)';

    await executeQuery(query, params);

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

async function updateMenu(body) {

    const id = body.id;
    const created = body.created;
    if (!id || !created) return 'Update params are missing';

    delete body.id;
    delete body.created;

    const 
        columns = [],
        params = [];
    
    for (let key in body) {
        columns.push(key);
        params.push(body[key]);
    }

    params.push(id);
    params.push(created);

    const query = 'UPDATE menu SET ' + columns.join('=?,') + ' WHERE ' + ["id", "created"].join('=? AND');

    await executeQuery(query, params);
    return body;
}

module.exports = {
    createMenu,
    getMenu,
    updateMenu
}