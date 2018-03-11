'use strict';

const bcrypt      = require ('bcryptjs');
const jwt         = require ('jwt-simple');

/**
 * createPassword - asynchronously generate salt and hash text
 * @param  {String} password - text that will be hashed
 * @return {Promise}         - A promise that will resolve to a hash or reject if hashing fails
 */
exports.createPassword = function (password) {
  return new Promise (function (resolve, reject) {
    bcrypt.genSalt (12, function (err, salt) {
      if (err) { return reject (err); }
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) { return reject (err); }
        resolve (hash);
      });
    });
  });
};


/**
 * comparePassword - given an entered password and the original hash compare to see if they are the same
 * @param  {String} password       - new string to compare against original hash
 * @param  {String} hashedPassword - original hash of the set password
 * @return {Promise}               - A promise that will resolve to a truthy value
 */
exports.comparePassword = function (password, hashedPassword) {
  return new Promise (function (resolve, reject) {
    bcrypt.compare (password, hashedPassword, function (err, isMatch) {
      if (err) { return reject (err); }
      return resolve (isMatch);
    });
  });
};

/**
 * createJWT - create a new JSON web token
 * @param  {String} secret - the token secret to encode the jsonwebtoken with
 * @param  {Object} user   - the user object; must have an id field
 * @param  {Number} exp    - the time in milliseconds from 1970
 * @return {String}        - the encoded jsonwebtoken
 */
exports.createJWT = function (secret, user, exp) {
  if (user.id == null) throw new Error ('User object must have an id field.');
  var now = Date.now();
  var exp = exp || now + 14 * 24 * 60 * 60 * 1000; // Get set expiration or just set to 14 days in the future
  var user = { id : user.id };
  var payload = {
    user: user,
    iat: now,
    exp: exp
  };
  return jwt.encode(payload, secret, 'HS512');
};

/**
 * createJWTResponse - create a new JSON web token response with user object
 * @param  {String} secret - the token secret to encode the jsonwebtoken with
 * @param  {Object} user   - the user object; must have an id field
 * @param  {Number} exp    - the time in milliseconds from 1970
 * @return {String}        - the encoded jsonwebtoken
 */
exports.createJWTResponse = function (secret, user, exp) {
  if (user.password != null) {
    delete user.password;
  }
  if (user.verification != null) {
    delete user.verification;
  }
  return { token : exports.createJWT(secret, user, exp), user : user };
};