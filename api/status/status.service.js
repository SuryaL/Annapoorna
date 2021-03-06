const { execQuery } = require('../../helpers/utils/db_utils');
const uuid = require('node-uuid');
const date_time = require('../../helpers/utils/date_time');
const UserService = require('../user/user.service');
const OrderService = require('../order/order.service');

function prepareNextWeekData() {
    let data = date_time.getNextWeekData();
    let defaults = {
        email_time: '2',
        order_count: 0,
        voting_count: 0,
        order_status: false,
        voting_status: false,
        active: true
    }
    Object.assign(data, defaults);
    return data;
}

async function createStatus(body) {
    const
        columns = [],
        params = [];

    for(let key in body) {
        columns.push(key);
        params.push(body[key]);
    }

    const query = 'INSERT INTO status (' + columns.join() + ') VALUES (' + Array(params.length).join('?,') + '?)';
    await execQuery(query, params);
    return body
}

async function activeweek() {
    const results = await execQuery('select * from status where active = ? allow filtering', [true]);
    return results.rows[0];
}

async function updateStatus(week, body) {
    const columns = [],
        params = [];

    for(let key in body) {
        columns.push(key);
        params.push(body[key]);
    }

    params.push(week);

    const query = 'UPDATE status SET ' + columns.join('=?,') + '=? WHERE week = ?';
    // console.log(query);
    await execQuery(query, params);
    return body;
}

async function checkStatus() {
    const results = await execQuery('select * from status where active = ? allow filtering', [true]);
    if(results.rows.length == 0) {
        console.log('no week in progress');
        //FIXME: send email(ONLY ONCE) to report something is wrong
        return;
    } else if(results.rows.length > 1) {
        console.log('more than one week active ---');
        //FIXME: send email(ONLY ONCE) to report something is wrong
        return;
    }

    /**
     * TODO: order count and vote count will also need to be checked 
     */

    const { week, voting_deadline, order_deadline, voting_status, order_status, voting_email_sent, order_email_sent, email_time } = results.rows[0];
    const email_time_ms = 2 * 60 * 60 * 1000;
    const voting_deadline_timestamp = new Date(voting_deadline).getTime();
    const voting_predeadline_timestamp = voting_deadline_timestamp - email_time_ms;
    const order_deadline_timestamp = new Date(order_deadline).getTime();
    const order_predeadline_timestamp = order_deadline_timestamp - email_time_ms;
    const current_utc_timestamp = new Date().getTime();

    if(!voting_email_sent && current_utc_timestamp > voting_predeadline_timestamp) {
        await updateStatus(week, { voting_email_sent: true })
        await UserService.sendMailToUsers({user_types:['user']})('voteending', {
            deadline: date_time.dallastime(voting_deadline)
        })
    }

    if(!voting_status && current_utc_timestamp > voting_deadline_timestamp) {
        console.log('voting time over', current_utc_timestamp, voting_deadline_timestamp);
        await updateStatus(week, { voting_status: true });
        // order for assured votes
        await OrderService.orderAssured(week);
        await UserService.sendMailToUsers({user_types:['user']})('orderenabled', {
            deadline: date_time.dallastime(order_deadline)
        })
    }

    if(!order_email_sent && current_utc_timestamp > order_predeadline_timestamp) {
        await updateStatus(week, { order_email_sent: true })
        await UserService.sendMailToUsers({user_types:['user']})('orderending', {
            deadline: date_time.dallastime(order_deadline)
        })
    }

    if(voting_status && !order_status && current_utc_timestamp > order_deadline_timestamp) {
        console.log('ordering time over', current_utc_timestamp, order_deadline_timestamp);
        // set order status to true
        // send email to cook?
        // active to false;
        //add next week?
        await UserService.sendMailToUsers({user_types:['cook']})('ordersdone', {
            deadline: date_time.dallastime(week)
        });
        await updateStatus(week, { order_status: true, active: false })

        let data = prepareNextWeekData();
        await createStatus(data);
        await UserService.sendMailToUsers({user_types:['user']})('voteenabled', {
            deadline: date_time.dallastime(data.voting_deadline)
        })
    }

    console.log('-');
}




module.exports = {
    activeweek,
    checkStatus
}