'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const config = require('../config');
const compose = require('composable-middleware');
const client = require('../boundaries/cassandra').client;
const utils = require('./utils');

// Login Required middleware.
exports.isAuthenticated = function(req, res, next) {
    return compose()
        .use(function(req, res, next) {
            if (req.query && req.query.hasOwnProperty('accessToken')) {
                req.headers.authorization = 'Bearer ' + req.query.accessToken;
                delete req.query.accessToken;
            }

            if (!req.headers.authorization) {
                return res.send(401, { message: 'Please make sure your request has an Authorization header' });
            }
            var token = req.headers.authorization.split(' ')[1];

            var payload = null;
            try {
                payload = jwt.decode(token, config.TOKEN_SECRET, 'HS512');
            } catch (err) {
                return res.send(401, err);
            }

            if (payload.exp <= Date.now() && payload.exp !== -1) {
                return res.send(401, new Error('Token has expired'));
            }
            req.user = payload.user;

            client.execute('SELECT * from user where id=? ALLOW FILTERING', [payload.user.id], { prepare: true })
                .then(function(result) {
                    if (result.rows.length === 0) {
                        return res.send(401, new Error('Invalid token.'));
                    } else {
                        req.user = result.rows[0];
                        next();
                    }
                });
        });
};

exports.createJWT = function(user, exp) {
    if (user.password != null) {
        delete user.password;
    }
    var now = Date.now();
    var exp = exp || now + 14 * 24 * 60 * 60 * 1000;
    var payload = {
        user: user,
        iat: now,
        exp: exp
    };
    return jwt.encode(payload, config.TOKEN_SECRET, 'HS512');
};

/**
 * hasRole - determines if the role of the user has the necessary privileges to proceed.
 * @param {String} roleRequired - the top level required role the user must have
 * @param {String} subRoleRequired - the specific role of the user after defining the top level
 * @returns {Object} returns the middleware object that will be used to check if the user is first authenticated then has the appropriate role.
 */
exports.hasRole = function(roleRequired, subRoleRequired) {
    if (!roleRequired) throw new Error('Required role needs to be set');

    return compose()
        .use(exports.isAuthenticated())
        .use(function(req, res, next) {
            let check = false;
            console.log(req.user.type);
            for (let i = 0; i < req.user.type.length; i++) {
                if (config.roles.indexOf(req.user.type[i]) >= config.roles.indexOf(roleRequired)) {
                    check = true;
                    break;
                }
            }
            if (!!check) {
                if (subRoleRequired != null && config.subRoles.indexOf(req.user.subrole) >= config.subRoles.indexOf(subRoleRequired)) {
                    next();
                } else if (subRoleRequired == null) {
                    next()
                } else {
                    return res.send(403, new Error('User is not authorized for this request.'));
                }
            } else {
                return res.send(403, new Error('User is not authorized for this request.'));
            }
        });
};
exports.hasOneRole = function(rolesRequired=[], subRoleRequired) {
    if (!rolesRequired) throw new Error('Required role needs to be set');

    return compose()
        .use(exports.isAuthenticated())
        .use(function(req, res, next) {
            let check = false;
            console.log(req.user.type);
            for (let i = 0; i < req.user.type.length; i++) {
                for(let roleRequired of rolesRequired){
                    if (config.roles.indexOf(req.user.type[i]) >= config.roles.indexOf(roleRequired)) {
                        check = true;
                        break;
                    }
                }
            }
            if (!!check) {
                if (subRoleRequired != null && config.subRoles.indexOf(req.user.subrole) >= config.subRoles.indexOf(subRoleRequired)) {
                    next();
                } else if (subRoleRequired == null) {
                    next()
                } else {
                    return res.send(403, new Error('User is not authorized for this request.'));
                }
            } else {
                return res.send(403, new Error('User is not authorized for this request.'));
            }
        });
};
/**
 * exchange - exchange existing token with a new token
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @param {Function} next - the next function
 */
exports.exchange = function(req, res, next) {
    res.json(utils.createJWTResponse(config.TOKEN_SECRET, req.user));
};