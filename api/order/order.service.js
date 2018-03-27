const {
    execQuery
} = require('../../helpers/utils/db_utils');
const uuid = require('node-uuid');

/**
 week
 user
 dish
 dish_name
 price
 quantity
 
 created
 modified
 
 feedback 
 rating
 */
function createNewOrderData() {
    const body = {};

    body.created = new Date().toISOString();
    body.modified = new Date().toISOString();
    // body.week = new Date().toISOString(); // for now

    //FIXME: need authentication middleware added
    // body.modified_by = req.user.id.toString();
    return body
}

async function findUserOrder(user, week) {
    if(!user || !week){
        throw new Error('Invalid user/week');
    }
    const query = 'Select * from orders where user = ? and week = ?';
    const found = await execQuery(query, [user, week]);
    return found.rows
}

async function getAllUserOrders(user){
    if(!user){
        throw new Error('Invalid user');
    }
    const query = 'Select * from orders where user = ? allow filtering';
    const found = await execQuery(query, [user]);
    return found.rows
}

async function deleteUserOrders(user, week) {
    const query = 'delete from orders where user = ? and week = ?';
    await execQuery(query, [user, week]);
    return true;
}

async function createOrders(body) {
    //delete
    const { user, week, dishes } = body;
    if(!user || !week || !dishes) {
        throw new Error('Invalid order');
    }
    await deleteUserOrders(user, week);

    const addedOrders = [];
    for(let dish_order of dishes) {
        let { dish, dish_name, price, quantity } = dish_order;
        let resp = await createOrderSingleItem({ week, user, dish, dish_name, price, quantity });
        resp && addedOrders.push(resp);
    }
    return addedOrders
}

async function createOrderSingleItem(body) {
    const columns = [],
        params = [];

    //delete
    delete body.feedback;
    delete body.rating;

    //required
    const reqd = ["week", "user", "dish", "dish_name", "price", "quantity"];
    const valid = true;
    reqd.forEach((k) => {
        if(body[k] == undefined || body[k] == null) {
            valid = false;
        }
    })
    if(!valid) { return null }

    Object.assign(body, createNewOrderData());
    for(let key in body) {
        columns.push(key);
        params.push(body[key]);
    }

    const query = 'INSERT INTO orders (' + columns.join() + ') VALUES (' + Array(params.length).join('?,') + '?)';
    await execQuery(query, params);
    return body;
}

function formatOrderHistory(orders){
    let history = {};
    for(let oItem of orders){
        if(!history[oItem.week]){
            history[oItem.week] = {week:oItem.week, dishes:[],total:0}
        }
        history[oItem.week]['dishes'].push({
            name: oItem.dish_name,
            price : oItem.price,
            quantity: oItem.quantity
        });
        history[oItem.week]['total'] += +(+oItem.price * +oItem.quantity).toFixed(2);
    }

    let history_orders=[];
    for(let week of Object.keys(history)){
        history_orders.push(history[week])
    }
    return history_orders
}

module.exports = {
    formatOrderHistory,
    createNewOrderData,
    findUserOrder,
    deleteUserOrders,
    createOrders,
    getAllUserOrders
}