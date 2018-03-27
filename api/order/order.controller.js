const OrderService = require('./order.service');

const createMyOrder = async function(req){
    console.log(req.body.dishes);
    if(!req.body.dishes) {
        throw new Error ('Select atleast one dish');
    }
    let body = {dishes:req.body.dishes, user :req.user.id, week: req.body.week};
    if(!req.current_week || !req.body.week || req.body.week !=  req.current_week.week || !req.current_week.voting_status || !!req.current_week.order_status){
        throw new Error('Failed')
    }

    // TODO: check week validity before insert
    const orders = await OrderService.createOrders(body);
    return orders;
}


const getMyOrder = async function(req){
    let {week}  = req.query;
    let user = (req.user.id || '').toString();
    console.log(week,user);
    return await OrderService.findUserOrder(user,week);
}

//TODO
// need api to update feedback and rating
// need separate api for admin

const find = async function(req){

}

const update = async function(req){
    
}

const remove = async function(req){
    
};


module.exports = {
    getMyOrder,
    createMyOrder,
    find,
    update, 
    remove
}