const { execQuery } = require('../../helpers/utils/db_utils');
const uuid = require('node-uuid');

const UserService = require('../user/user.service');
const MenuService = require('../menu/menu.service');
const VoteService = require('../vote/vote.service');
const VoteController = require('../vote/vote.controller');



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

async function getAllOrdersWeekly(week) {
    if(!week) {
        throw new Error('Invalid week');
    }
    const query = 'Select * from orders where week = ?';
    const found = await execQuery(query, [week]);
    return found.rows
}

async function findUserOrder(user, week) {
    if(!user || !week) {
        throw new Error('Invalid user/week');
    }
    const query = 'Select * from orders where user = ? and week = ?';
    const found = await execQuery(query, [user, week]);
    return found.rows
}

async function getAllUserOrders(user) {
    if(!user) {
        throw new Error('Invalid user');
    }
    const query = 'Select * from orders where user = ? allow filtering';
    const found = await execQuery(query, [user]);
    return found.rows
}

async function getUserOrderPriceTotal(user,active_week) {
    const orders = await getAllUserOrders(user);
    let total = 0;
    let total_no_currentweek = 0;
    
    for(let oItem of orders) {
        if(active_week != oItem.week){
            total_no_currentweek += +(+oItem.price * +oItem.quantity).toFixed(2);
        }
        total += +(+oItem.price * +oItem.quantity).toFixed(2);
    }
   
    return {orderslist:orders, total, total_no_currentweek};
}

async function getAllOrdersPriceTotal(active_week) {
    const orders = await getAllOrders(active_week);
    let total = 0;
    let total_no_currentweek = 0;
    for(let oItem of orders) {
        if(active_week != oItem.week){
            total_no_currentweek += +(+oItem.price * +oItem.quantity).toFixed(2);
        }
        total += +(+oItem.price * +oItem.quantity).toFixed(2);
    }
   
    return {orderslist:orders, total, total_no_currentweek};
}

async function deleteUserOrders(user, week) {
    const query = 'delete from orders where user = ? and week = ?';
    await execQuery(query, [user, week]);
    return true;
}

async function updateUserRating(user, week, dish_id, rating, feedback = null) {
    const query = 'update orders set rating = ?, feedback = ? where user = ? and week = ? and dish=?';
    await execQuery(query, [rating.toString(), feedback, user, week, dish_id]);
    return true;
}


async function createOrders(body) {
    //delete
    const {
        user,
        week,
        dishes
    } = body;
    if(!user || !week || !dishes) {
        throw new Error('Invalid order');
    }
    await deleteUserOrders(user, week);

    const addedOrders = [];
    for(let dish_order of dishes) {
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
    let valid = true;
    reqd.forEach((k) => {
        if(body[k] == undefined || body[k] == null) {
            valid = false;
        }
    })
    if(!valid) {
        return null
    }

    Object.assign(body, createNewOrderData());
    for(let key in body) {
        columns.push(key);
        params.push(body[key]);
    }
    console.log(params);
    const query = 'INSERT INTO orders (' + columns.join() + ') VALUES (' + Array(params.length).join('?,') + '?)';
    await execQuery(query, params);
    return body;
}

function formatOrderHistory(orders) {
    let history = {};
    for(let oItem of orders) {
        if(!history[oItem.week]) {
            history[oItem.week] = {
                week: oItem.week,
                dishes: [],
                total: 0,
            }
        }

        let found = history[oItem.week]['dishes'].find((dish_item) => dish_item.price == oItem.price && dish_item.dish_id.toString() == oItem.dish.toString());

        if(!found) {
            history[oItem.week]['dishes'].push({
                dish_id: oItem.dish,
                name: oItem.dish_name,
                price: oItem.price,
                quantity: oItem.quantity,
                feedbacks: !!oItem.feedback ? [oItem.feedback] : [],
                ratings: !!oItem.rating ? [oItem.rating] : []
            });
        } else {
            found.quantity = +found.quantity + +oItem.quantity;
            !!oItem.feedback && found.feedbacks.push(oItem.feedback);
            !!oItem.rating && found.ratings.push(oItem.rating);
        }

        history[oItem.week]['total'] += +(+oItem.price * +oItem.quantity).toFixed(2);
    }

    let history_orders = [];
    for(let week of Object.keys(history)) {
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
            price: order.price,
            quantity: order.quantity
        })
    })
    let users_list = await UserService.getUsers({});
    let allUsers = {};
    users_list.forEach(user => {
        let id = user.id;
        let personName = user.first_name || user.email;
        allUsers[id] = personName;
    })
    OrderArray = [];
    Object.keys(orderDetails).forEach(key => {
        OrderArray.push({ personName: allUsers[key], dishes: orderDetails[key] })

    })
    // console.log('OrderArray :',OrderArray)
    return OrderArray;
}

async function findMissingRatings(orders) {
    let unrated_obj = {};
    for(let oItem of orders) {
        // added week validation to skip uneaten days
        const has_eaten = WeekHasBeenEaten(oItem.week);

        if(oItem.rating || !has_eaten) {
            continue;
        }

        if(!unrated_obj[oItem.week]) {
            unrated_obj[oItem.week] = {
                week: oItem.week,
                dishes: [],
            }
        }

        let found = unrated_obj[oItem.week]['dishes'].find((dish_item) => dish_item.price == oItem.price && dish_item.dish_id.toString() == oItem.dish.toString());
        if(!found) {
            unrated_obj[oItem.week]['dishes'].push({
                dish_id: oItem.dish,
                name: oItem.dish_name,
                rating: oItem.rating,
                feedback: oItem.feedback
            });
        }
    }
    let unrated = [];
    for(let week of Object.keys(unrated_obj)) {
        unrated.push(unrated_obj[week])
    }
    return unrated
}

async function orderAssured(week) {
    let [all_votes, allmenu, majority ] = await Promise.all([
         VoteService.getAllVotesWeekly(week),
         MenuService.getMenu({}), 
         VoteController.getMajority({query:{week}})
    ])

    for(let user_item of all_votes) {
        let assure = user_item.assure||{};
        let assured_dishes = Object.keys(assure)
        for(let dish of assured_dishes) {
            if(majority.indexOf(dish.toString())!=-1){
                let foundMenu = allmenu.find(menu_item => menu_item.id.toString() == dish);
                if(foundMenu && assure[dish]) {
                    await createOrderSingleItem({
                        week,
                        user: user_item.user,
                        dish,
                        dish_name: foundMenu.name,
                        price: foundMenu.price,
                        quantity: assure[dish]
                    })
                }
            }
        }
    }
}

async function UpdateMyRatings(user, missedRatings, updateRatings) {
    const unrated_obj = missedRatings.reduce((unrated_obj, week_obj) => {
        week_obj.dishes.forEach(dish => {
            if(!unrated_obj[week_obj.week]) {
                unrated_obj[week_obj.week] = {}
            }
            unrated_obj[week_obj.week][dish.dish_id] = dish
        })
        return unrated_obj;
    }, {});

    for(let u_rating of updateRatings) {
        const { week, dish_id, feedback, rating } = u_rating;
        if(!unrated_obj[week] || !unrated_obj[week][dish_id] || !rating) {
            continue;
        }
        // console.log(user, week, dish_id, rating, feedback);
        //update order rating 
        let [menu_item] = await Promise.all([
            MenuService.getMenu({ id: dish_id }),
            updateUserRating(user, week, dish_id, rating, feedback)
        ])
        // update menu rating
        let { rating: menu_rating, total_ratings, created, id } = menu_item[0];
        if(!!created && !!id) {
            if(!total_ratings) {
                total_ratings = 0;
            }
            if(!menu_rating) {
                menu_rating = 0;
            }
            let new_total_ratings = +total_ratings + 1;
            menu_rating = (((+menu_rating * +total_ratings) + +rating) / +new_total_ratings).toFixed(2);
            await MenuService.updateMenu({ rating: menu_rating, total_ratings: new_total_ratings.toString(), created, id })
        }
    }
}

function WeekHasBeenEaten(week) {
    const uneaten_duration = +(11.5 * 24 * 60 * 60 * 1000).toFixed(0); //monday to next friday
    const week_timestamp = new Date(week).getTime();
    const current_utc_timestamp = new Date().getTime();
    const has_eaten = ((week_timestamp + uneaten_duration) < current_utc_timestamp);
    return has_eaten;
}

module.exports = {
    orderAssured,
    UpdateMyRatings,
    findMissingRatings,
    getAllOrders,
    getAllOrdersPriceTotal,
    getUserOrderPriceTotal,
    formatOrderHistory,
    createNewOrderData,
    findUserOrder,
    deleteUserOrders,
    createOrders,
    getAllUserOrders,
    formatOrderDetails,
    getAllOrdersWeekly
}