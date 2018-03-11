'use strict';

const bcrypt      = require ('bcrypt');
const jwt         = require ('jwt-simple');
const config      = require ('../config');
const compose     = require ('composable-middleware');
const client      = require ('../boundaries/cassandra').client;

// Login Required middleware.
exports.isAuthenticated = function (req, res, next) {
  return compose()
  .use ( function ( req, res, next ) {
    if(req.query && req.query.hasOwnProperty('accessToken')) {
        req.headers.authorization = 'Bearer ' + req.query.accessToken;
        delete req.query.accessToken;
    }

    if (!req.headers.authorization) {
      return res.send(401,{ message: 'Please make sure your request has an Authorization header' });
    }
    var token = req.headers.authorization.split(' ')[1];

    var payload = null;
    try {
      payload = jwt.decode(token, config.TOKEN_SECRET, 'HS512');
    }
    catch (err) {
      return res.send (401, err);
    }

    if (payload.exp <= Date.now() && payload.exp !== -1) {
      return res.send(401, new Error('Token has expired') );
    }
    req.user = payload.user;

    client.execute ('SELECT * from user where id=? ALLOW FILTERING', [payload.user.id], { prepare : true })
    .then (function (result) {
      if (result.rows.length === 0) {
        return res.send (401, new Error ('Invalid token.'));
      } else {
        req.user = result.rows[0];
        if (!!payload.user.center_id) {
          req.user.center_id = payload.user.center_id;
          next();
        } else {
          mysqlClient.queryAsync('SELECT * from user where id=?', [req.user.facebook])
          .then(resp => {
            // req.user.center_id = exports.encrypt(req.user.facebook, resp[0].center_key);
            req.user.center_id = resp[0].center_id;
            next();
          });
        }
      }
    });
  });
};

exports.createJWT = function (user, exp) {
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
exports.hasRole = function (roleRequired, subRoleRequired) {
  if (!roleRequired) throw new Error ('Required role needs to be set');

  return compose()
    .use ( exports.isAuthenticated() )
    .use ( function ( req, res, next ) {
       if (config.userRoles.indexOf (req.user.role) >= config.userRoles.indexOf (roleRequired) ) {
           if ( subRoleRequired != null && config.subRoles.indexOf (req.user.subrole) >= config.subRoles.indexOf(subRoleRequired)) {
            next();
           } else if (subRoleRequired == null) {
            next()
           } else {
            return res.send (403, new Error ('User is not authorized for this request.'));
           }
       } else {
           return res.send (403, new Error ('User is not authorized for this request.'));
       }
    });
};
