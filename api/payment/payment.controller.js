const PaymentService = require('./payment.service');

async function addUserPayments(req){
    let payments = req.body;
    let proms = [];
    for(pay of payments){
        proms.push(PaymentService.addUserPayment(pay.user, pay.amount,'approved',true));
    }
    await Promise.all(proms);
    return true;
}

// body params: pay_amount
async function addPaymentUser(req){
    let user = req.user;
    let {pay_amount} = req.body;
    if(!pay_amount || !user || !user.id){
        throw new Error('Invalid pay')
    }
    await PaymentService.addUserPayment(user.id, pay_amount,'pending',false);
    return true;
}

// body params: status, week, user
async function updateUserPayment(req){
    let {status, week, user} = req.body;
    if(!status|| !week|| !user){
        throw new Error('Invalid update');
    }

    await PaymentService.updateUserPayment(user, week, status);
    return true;
}

async function getAllUsersBalances(req){
    return await PaymentService.getAllUsersBalances();
}

async function getUserBalance(req){
    let user = req.user;
    return await (PaymentService.getUserBalance(user.id));
}

async function getCookBalance(req){
    let user = req.user;
    return await (PaymentService.getCookBalance(user.id));
}


const create = async function(req){

}

const find = async function(req){

}

const update = async function(req){
    
}

const remove = async function(req){
    
};


module.exports = {
    addPaymentUser,
    updateUserPayment,
    getCookBalance,
    getUserBalance,
    getAllUsersBalances,
    addUserPayments,
    create,
    find,
    update, 
    remove
}