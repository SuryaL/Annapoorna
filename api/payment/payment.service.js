const { execQuery } = require('../../helpers/utils/db_utils');

const UserService = require('../user/user.service');
const OrderService = require('../order/order.service');

async function getUserBalance(user_id) {
    let orders_bill = await OrderService.getUserOrderPriceTotal(user_id);
    return {
        orders_bill
    }
}

async function getUserPayments(user_id) {
    return {
        payment_history: [{
            week: 'Feb 20',
            amount: '40.99'
       }, {
            week: 'Feb 21',
            amount: '-20.99'
    }],
        total: 20
    }
}

async function getAllUsersBalances() {
    let users_list = await UserService.getUsers({});
    let users = users_list.map(user=>({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
    }))
    // console.log(users_list);
    let proms = [];
    for (let user of users){
        proms.push(getUserBalance(user.id).then((bal)=>{
            user.balance = bal;
        }))
    }
    await proms;
}
getAllUsersBalances();
module.exports = {
    getAllUsersBalances,
    getUserBalance
}