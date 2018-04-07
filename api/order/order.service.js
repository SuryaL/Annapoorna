const {execQuery} = require('../../helpers/utils/db_utils');
const uuid = require('node-uuid');

const UserService = require('../user/user.service');



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

async function getAllOrders() {
    const query = 'Select * from orders';
    const found = await execQuery(query, []);
    return found.rows
}

async function findUserOrder(user, week) {
    if (!user || !week) {
        throw new Error('Invalid user/week');
    }
    const query = 'Select * from orders where user = ? and week = ?';
    const found = await execQuery(query, [user, week]);
    return found.rows
}

async function getAllUserOrders(user) {
    if (!user) {
        throw new Error('Invalid user');
    }
    const query = 'Select * from orders where user = ? allow filtering';
    const found = await execQuery(query, [user]);
    return found.rows
}

async function getUserOrderPriceTotal(user) {
    const orders = await getAllUserOrders(user);
    let total = 0;
    for (let oItem of orders) {
        total += +(+oItem.price * +oItem.quantity).toFixed(2);
    }
    return total;
}

async function getAllOrdersPriceTotal(user) {
    const orders = await getAllOrders();
    let total = 0;
    for (let oItem of orders) {
        total += +(+oItem.price * +oItem.quantity).toFixed(2);
    }
    return total;
}

async function deleteUserOrders(user, week) {
    const query = 'delete from orders where user = ? and week = ?';
    await execQuery(query, [user, week]);
    return true;
}

async function createOrders(body) {
    //delete
    const {
        user,
        week,
        dishes
    } = body;
    if (!user || !week || !dishes) {
        throw new Error('Invalid order');
    }
    await deleteUserOrders(user, week);

    const addedOrders = [];
    for (let dish_order of dishes) {
        let {
            dish,
            dish_name,
            price,
            quantity
        } = dish_order;
        let resp = await createOrderSingleItem({
            week,
            user,
            dish,
            dish_name,
            price,
            quantity
        });
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
        if (body[k] == undefined || body[k] == null) {
            valid = false;
        }
    })
    if (!valid) {
        return null
    }

    Object.assign(body, createNewOrderData());
    for (let key in body) {
        columns.push(key);
        params.push(body[key]);
    }

    const query = 'INSERT INTO orders (' + columns.join() + ') VALUES (' + Array(params.length).join('?,') + '?)';
    await execQuery(query, params);
    return body;
}

function formatOrderHistory(orders) {
    let history = {};
    for (let oItem of orders) {
        if (!history[oItem.week]) {
            history[oItem.week] = {
                week: oItem.week,
                dishes: [],
                total: 0
            }
        }

        let found = history[oItem.week]['dishes'].find((dish_item) => dish_item.price == oItem.price && dish_item.dish_id.toString() == oItem.dish.toString());

        if (!found) {
            history[oItem.week]['dishes'].push({
                dish_id: oItem.dish,
                name: oItem.dish_name,
                price: oItem.price,
                quantity: oItem.quantity
            });
        } else {
            found.quantity = +found.quantity + +oItem.quantity;
        }

        history[oItem.week]['total'] += +(+oItem.price * +oItem.quantity).toFixed(2);
    }

    let history_orders = [];
    for (let week of Object.keys(history)) {
        history_orders.push(history[week])
    }
    return history_orders
}

async function formatOrderDetails(orders) {
    let orderDetails = {};
    orders.forEach((order) => {
        let user = (order.user).toString();
        orderDetails[user] = orderDetails.hasOwnProperty(user) ? orderDetails[user] : [];
        orderDetails[user].push({
            dishName: order.dish_name,
            quantity: order.quantity
        })
    })
    let users_list = await UserService.getUsers({});
    let allUsers ={};
    users_list.forEach(user=>{
        let id = user.id;
        let  personName = user.first_name  || user.email;
        allUsers[id] = personName;
    })
    OrderArray =[];
    Object.keys(orderDetails).forEach(key =>{
        OrderArray.push({personName: allUsers[key], dishes: orderDetails[key]})

    })
    // console.log('OrderArray :',OrderArray)
    return OrderArray;
}

module.exports = {
    getAllOrders,
    getAllOrdersPriceTotal,
    getUserOrderPriceTotal,
    formatOrderHistory,
    createNewOrderData,
    findUserOrder,
    deleteUserOrders,
    createOrders,
    getAllUserOrders,
    formatOrderDetails
}