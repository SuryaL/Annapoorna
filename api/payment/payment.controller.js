const PaymentService = require('./payment.service');

async function addUserPayments(req){
    let payments = req.body;
    let proms = [];
    for(pay of payments){
        proms.push(PaymentService.addUserPayment(pay.user, pay.amount));
    }
    await Promise.all(proms);
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
    getCookBalance,
    getUserBalance,
    getAllUsersBalances,
    addUserPayments,
    create,
    find,
    update, 
    remove
}