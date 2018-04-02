const { execQuery } = require('../../helpers/utils/db_utils');

const UserService = require('../user/user.service');
const OrderService = require('../order/order.service');

async function addUserPayment(user, amount){
    if(!user || (!amount && +amount != 0)){
        throw new Error('missing params');
    }
    let week = (new Date()).toISOString();
    await execQuery('insert into payments (week,created,user,amount_paid) values(?,?,?,?)',[week,week,user,amount.toString()]);
}
// addUserPayment('b4f1bbd8-872b-4847-a4c1-3e55ea5d15ea',-10)

async function getUserBalance(user_id) {
    let orders_bill = await OrderService.getUserOrderPriceTotal(user_id);
    let payments = await getUserPayments(user_id);
    return {
        orders_bill,
        payments
    }
}

async function getUserPayments(user_id) {
    if(!user_id){
        throw new Error('missing params');
    }
    
    let payments = await execQuery('select * from payments where user =? allow filtering',[user_id]);
    
    let resp = {
        payment_history:[],
        total:0
    }
    
    payments.rows.forEach(row => {
        resp.payment_history.push({
            week: row.week,
            amount: row.amount_paid
        });

        resp.total += +row.amount_paid;
    });
    
    return resp;
}

async function getAllUsersBalances() {
    let users_list = await UserService.getUsers({});
    let users = users_list.map(user=>({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email:user.email
    }))
    // console.log(users_list);
    let proms = [];
    for (let user of users){
        proms.push(getUserBalance(user.id).then((bal)=>{
            Object.assign(user, bal);
            return user
        }))
    }
    return await Promise.all(proms);
}
// getAllUsersBalances().then(console.log);

module.exports = {
    addUserPayment,
    getAllUsersBalances,
    getUserBalance
}