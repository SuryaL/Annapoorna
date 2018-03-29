const { execQuery } = require('../../helpers/utils/db_utils');

const UserService = require('../user/user.service');
const OrderService = require('../order/order.service');

async function getUserBalance(user_id) {
    let orders_bill = await OrderService.getUserOrderPriceTotal(user_id);
}

async function getUserPayments(user_id) {
    return {
        history: [{
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

}

module.exports = {
    getAllUsersBalances,
    getUserBalance
}