const request  = require('request');

const UserService = require('./user.service');
const _ = require('underscore');
const email = require('../../helpers/email');

const create = async function(req) {
    const body = _.clone(req.body);
    if(body.id != null) {
        delete body.id;
    }
    if(!req.body.type || !req.body.email) {
        throw new Error('Required params missing');
    }
    
    const foundUser = (await UserService.getUser({ email: body.email }));
    
    if(!!foundUser) {
        throw new Error('User exists');
    }

    if(req.body.type == 'cook'){
        let resps = await find({query:{}});
        let foundCook = resps.rows && resps.rows.find((row)=>{
            return row.type.indexOf('cook')
        })
        if(foundCook){
            throw new Error('App does not support multiple cooks yet.');
        }
    }
    // PROCEED
    Object.assign(body, UserService.createNewUserData());
    body.modified_by = req.user.id;
    body.active = true;
    body.type = [req.body.type];
    body.email = req.body.email;

    let resp = await UserService.createUser(body);
    
    // TODO: replace with UserService.sendMailToUsers
    // email.send(body.email, 'welcome', { user: { email: body.email, } }, []);
    UserService.sendMailToUsers({user_ids:[body.id.toString()]})('welcome',{});
    return resp;
}


const find = async function(req) {
    const query = _.clone(req.query);
    const result = await UserService.getUsers(query);
    return result;
}

const emailUsers = async function(req){
    const {ids,email_body} = req.body;
    if(!ids || !email_body || !ids.length){
        throw new Error('Missing params');
    }
    const result = await UserService.sendMailToUsers({user_ids:ids})('custom',{
        info: email_body,
        subinfo:''
    });
    return 'success'
}


// const findOne = async function (req) {
//     const query = _.clone(req.query);
//     query.email = req.body.email;
//     const result = await UserService.getUsers(query);
//     return result;
// }

function streamprofilepic (req,res,next){
    let {small, id} = req.query;
    if(!id){
        return res.send(200,'')
    }
    UserService.getprofilepic(req.query.id)
    .then((image)=>{
        if(!image){
        return res.send(200,'')
        }
        if(small){
            image = image + '&type=small';
        }
        request(image).pipe(res);
    }).catch((err)=>{
        return res.send(200,'')
    })
}

const update = async function(req) {}

const remove = async function(req) {};


module.exports = {
    streamprofilepic,
    emailUsers,
    create,
    find,
    update,
    remove
}