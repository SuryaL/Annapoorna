const OrderService = require('./order.service');

const createUserOrder = async function(req){
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


const getUserOrder = async function(req){
    let {week}  = req.query;
    let user = (req.user.id || '').toString();
    return await OrderService.findUserOrder(user,week);
}

const getAllUserOrders = async function(req){
    const user = (req.user.id || '').toString();
    const orders = await OrderService.getAllUserOrders(user);
    const history_orders = OrderService.formatOrderHistory(orders);
    return history_orders;
}

const getAllUsersOrders = async function(req){
    // const user = (req.user.id || '').toString();
    const orders = await OrderService.getAllOrders();
    const history_orders = OrderService.formatOrderHistory(orders);
    return history_orders;
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
    getAllUsersOrders,
    getAllUserOrders,
    getUserOrder,
    createUserOrder,
    find,
    update, 
    remove
}