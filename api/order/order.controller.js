const OrderService = require('./order.service');

const createUserOrder = async function(req){
    // console.log(req.body.dishes);
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

const getAllUsersOrdersWeekly = async function(req){
    let {week}  = req.query;
    const orders = await OrderService.getAllOrdersWeekly(week);
    const order_details = OrderService.formatOrderDetails(orders);
    return order_details;
}

const getMyMissedRatings = async function(req){
    const user = (req.user.id || '').toString();
    const orders = await OrderService.getAllUserOrders(user);
    const ratings = OrderService.findMissingRatings(orders);
    return ratings;
}

const updateMyOrderRatings = async function(req){
    const user = (req.user.id || '').toString();
    console.log(JSON.stringify(req.body,null,2));
    if(!req.body.ratings || !req.body.ratings.length) {
        throw new Error ('No ratings to update');
    }
    const missedRatings = await getMyMissedRatings(req);
    await OrderService.UpdateMyRatings(user, missedRatings,req.body.ratings);
}

// getMyMissedRatings({user:{id:'b4f1bbd8-872b-4847-a4c1-3e55ea5d15ea'}}).then((resp)=>{
//     console.log(JSON.stringify(resp,null,2))
// })


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
    updateMyOrderRatings,
    getMyMissedRatings,
    getAllUsersOrders,
    getAllUserOrders,
    getUserOrder,
    createUserOrder,
    find,
    update, 
    remove,
    getAllUsersOrdersWeekly
}