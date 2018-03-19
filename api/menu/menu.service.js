const {execQuery} =  require('../../helpers/utils/db_utils');
const uuid = require('node-uuid');

function createNewMenuData(){
    const body = {};
    
    body.id = uuid.v4();
    body.deleted = false;
    body.created = new Date().toISOString();
    body.modified = new Date().toISOString();

    //FIXME: need authentication middleware added
    // body.modified_by = req.user.id.toString();
    return body
}

async function createMenu(body){
    //TODO : verify all params body
        
    const 
        columns = [],
        params = [];
    
    for (let key in body) {
        columns.push(key);
        params.push(body[key]);
    }

    const query = 'INSERT INTO menu (' + columns.join() + ') VALUES (' + Array(params.length).join('?,') + '?)';

    await execQuery(query, params);

    return body;
}


async function getMenu(queryParams) {
    const options = queryParams.options || {};
    if (queryParams.options) {
        delete queryParams.options;
    }

    // FIXME: not deleted only service
    const columns = ['deleted'];
    const params = [false];

    for (let key in queryParams) {
        columns.push(key);
        params.push(queryParams[key]);
    }

    let query = 'SELECT id,name,created,image,type FROM menu';
    if (columns.length > 0) {
        query += ' WHERE ' + columns.join('=? AND ') + '=? ALLOW FILTERING';
    }

    return (await execQuery(query, params, options)).rows;
}

async function updateMenu(body) {

    const id = body.id;
    const created = body.created;
    if (!id || !created) throw new Error('Update params are missing');

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

    const query = 'UPDATE menu SET ' + columns.join('=?,') + ' WHERE id = ? AND created = ?';

    await execQuery(query, params);
    return body;
}


async function removeMenu(id) {
    if (!id) throw new Error('id is missing');

    const {rows} = await getMenu({id});
    const found = rows[0];
    if(!found || !found.created) throw new Error('Delete params are missing');
    const created = found.created;

    const 
        params = [true];
    
    params.push(id);
    params.push(created);

    const query = 'UPDATE menu SET  deleted = ?  WHERE id = ? AND created = ?';

    await execQuery(query, params);
}
module.exports = {
    createNewMenuData,
    createMenu,
    getMenu,
    updateMenu,
    removeMenu
}