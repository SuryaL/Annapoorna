const client = require('../../boundaries/cassandra').client;
const faker = require('../../faker.js');
const executeQuery = require('../utils').execQuery;

function createFakeData(table) {
    // console.log(faker.getUser());
    let data;
    if (!table) {
        console.log('no table name given');
        return};
    if (table == 'user') data = faker.getUser();
    else if (table == 'menu') data = faker.getMenu();
    else if (table == 'voting') data = faker.getVotings();
    else if (table == 'orders') data = faker.getOrder();
    // else if (table == 'status') data = faker.getStatus();
    // else if (table == 'payment') data = faker.getPayment();
    else return;

    let tableName = table;
    const columns = [];
    const params = [];
    const questions = [];
    Object.keys(data).forEach(key => {
        columns.push(key);
        params.push(data[key]);
        questions.push('?');
    })
    const query = 'INSERT INTO table (' + columns.join() + ') VALUES (' + questions.join() + ')';
    // executeQuery(query, params)

}


function GenerateData(count) {

    if (!!count && count >0){
        for (let i = 1; i <= count; i++) {
            // createFakeData('user');
            createFakeData();
            
            // createFakeData('voting')
            // createFakeData('menu')
            // createFakeData('order')
            // createFakeData('user')
        }
    }
    else{
        console.log(' please specify the count');
    }
}

// module.exports = {
//     GenerateData();

// }
// GenerateData(1);