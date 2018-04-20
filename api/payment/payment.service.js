const { execQuery } = require('../../helpers/utils/db_utils');

const UserService = require('../user/user.service');
const OrderService = require('../order/order.service');
const StatusController = require('../status/status.controller');

async function addUserPayment(user, amount, status='pending',admin_added=false){
    if(!user || !amount || isNaN(+amount) ||+amount == 0){
        console.log('object',amount);
        throw new Error('missing params');
    }
    amount = +((+amount).toFixed(2));
    let week = (new Date()).toISOString();
    await execQuery('insert into payments (week,created,user,amount_paid,status,admin_added) values(?,?,?,?,?,?)',[week,week,user,amount.toString(),status,admin_added]);
}

async function updateUserPayment(user, week, status){
    if(!status|| !week|| !user){
        throw new Error('Invalid update');
    }
    if(['accepted','deleted','pending','rejected'].indexOf(status) == - 1){
        throw new Error('Invalid status');
    }

    await execQuery('update payments set status = ? where user =? and week = ?',[status,user,week]);
}


// addUserPayment('b4f1bbd8-872b-4847-a4c1-3e55ea5d15ea',-10)

async function getUserBalance(user_id) {
    let active_week = (await StatusController.getCurrentWeek() || {}).week || '';
    let {total:orders_bill,orderslist,total_no_currentweek} = await OrderService.getUserOrderPriceTotal(user_id, active_week);
    let payments = await getUserPayments(user_id);
    return {
        orders_bill,
        payments,orderslist,total_no_currentweek
    }
}

async function getCookBalance(user_id) {
    let active_week = (await StatusController.getCurrentWeek() || {}).week || '';
    let {total:orders_bill,orderslist,total_no_currentweek} = await OrderService.getAllOrdersPriceTotal(active_week);
    let payments = await getUserPayments(user_id);
    return {
        orders_bill: - +orders_bill,
        payments
        ,orderslist,total_no_currentweek
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
    
    payments.rows.forEach(({status, admin_added, week,amount_paid:amount}) => {
        resp.payment_history.push({
            week,
            amount,
            status,
            admin_added
        });

        if(status == 'accepted'){
            resp.total += +amount;
        }
    });
    
    return resp;
}

async function getAllUsersBalances() {
    let users_list = await UserService.getUsers({});
    let users = users_list.map(user=>({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email:user.email,
        type: user.type,
        image: user.image
    }))
    // console.log(users_list);
    let proms = [];
    for (let user of users){
        if(user.type.indexOf('user')!=-1){
            proms.push(getUserBalance(user.id).then((bal)=>{
                Object.assign(user, bal);
                user.has_type ='user';
                return user
            }))
        }else if(user.type.indexOf('cook')!=-1){
            proms.push(getCookBalance(user.id).then((bal)=>{
                Object.assign(user, bal);
                user.has_type ='cook';
                return user
            }))
        }
    }
    return await Promise.all(proms);
}
// getAllUsersBalances().then(console.log);

module.exports = {
    addUserPayment,
    updateUserPayment,
    getAllUsersBalances,
    getCookBalance,
    getUserBalance
}