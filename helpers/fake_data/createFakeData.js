const faker = require('./faker.js');
const {execQuery} =  require('../../helpers/utils/db_utils');

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
    else if (table == 'status') data = faker.getStatus();
    else if (table == 'payment') data = faker.getPayment();
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
    const query = 'INSERT INTO '+ table +' (' + columns.join() + ') VALUES (' + questions.join() + ')';
    // console.log(query,params)
    execQuery(query, params)

}


function GenerateData(count) {

    if (!!count && count >0){
        for (let i = 1; i <= count; i++) {
            // createFakeData('user');
            // createFakeData();
            // createFakeData('voting')
            // createFakeData('menu')
            // createFakeData('order')
            // createFakeData('user')
            createFakeData('status')
        }
    }
    else{
        console.log(' please specify the count');
    }
}

// module.exports = {
//     GenerateData();

// }
GenerateData(1);