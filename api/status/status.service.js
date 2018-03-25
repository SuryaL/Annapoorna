const {execQuery} =  require('../../helpers/utils/db_utils');
const uuid = require('node-uuid');

async function activeweek() {
    const results = await execQuery('select * from status where active = ? allow filtering', [true]);
    return results.rows[0];
}

module.exports = {
    activeweek
}