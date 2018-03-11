'use strict';

const config = require('../../config');
const jwt = require('jwt-simple');
const auth = require('../auth.controller');
const request = require('request');
const uuid = require('uuid');
const client = require('../../boundaries/cassandra').client;
const Promise = require('bluebird');

module.exports = function(api) {

    api.post('/auth/facebook', function(req, res, next) {

        var accessTokenUrl = 'https://graph.facebook.com/v2.8/oauth/access_token';

        var params = {
            code: req.body.code,
            client_id: req.body.clientId,
            client_secret: config.FACEBOOK_SECRET,
            redirect_uri: req.body.redirectUri
        };

        // Step 1. Exchange authorization code for access token.
        request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
            if (response.statusCode !== 200) {
                console.log(err, accessToken.error);
                return res.send(500, accessToken.error);
            }
            console.log('Access Token: ', accessToken);

            // Step 2. Retrieve profile information about the current user. Linking an account
            getFbData(accessToken, req, res, next);
        });
    });

    function getFbData(accessToken, req, res, next) {
        let fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name', 'about', 'age_range', 'birthday', 'gender', 'hometown']; //'context'
        let graphApiUrl = 'https://graph.facebook.com/v2.8/me?fields=' + fields.join(',');

        request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
            if (response.statusCode !== 200) {
                return res.send(500, profile.error);
            }
            // console.log(JSON.stringify(profile, null, 2));
            if (req.header('Authorization')) {
                let token = req.header('Authorization').split(' ')[1];
                let payload = jwt.decode(token, config.TOKEN_SECRET, 'HS512');
                client.execute('SELECT * FROM user where facebook = ? allow FILTERING', [profile.id], { prepare: true })
                    .then(function(results) {

                        client.execute('SELECT * FROM user where id=? ALLOW FILTERING', [payload.user.id], { prepare: true })
                            .then(function(results) {
                                if (results.rows.length === 0) {
                                    return res.send(400, new Error('User not found'));
                                }
                                let user = results.rows[0];
                                user.facebook = profile.id;
                                user.picture = user.picture || 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
                                user.name = user.name || profile.name;
                                user.email = user.email || profile.email;
                                user.accessed_portal = new Date();
                                user.first_name = profile.first_name;
                                user.last_name = profile.last_name;

                                let query = 'UPDATE user SET facebook=?, accessed_portal=?, email=?, gender=?, picture=?, name=?, first_name=?, last_name=? WHERE id=?';
                                let params = [user.facebook, user.accessed_portal, user.email, profile.gender, profile.picture, profile.name, profile.first_name, profile.last_name, payload.user.id];
                                client.execute(query, params, { prepare: true })
                                    .then(function(results) {
                                        res.send({ token: auth.createJWT(user) });
                                    })
                            });
                    });
            } else {
                // Create new user with email and id.

                let user = {};
                user.id = uuid.v4();
                user.facebook = profile.id;
                user.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
                user.name = profile.name;
                user.email = profile.email;
                user.gender = (profile.gender) ? profile.gender : null;
                user.accessed = new Date();
                user.created = new Date();
                console.log('Email: ', profile.email);
                client.execute('SELECT * FROM user where facebook = ? allow FILTERING', [profile.id], { prepare: true })
                    .then(function(results) {
                        if (results.rows.length > 0) {
                            let result = results.rows[0];
                            user.id = result.id;
                            // user.accessed = result.accessed;
                            user.created = result.created;
                        }
                        let promises = [];

                        let query = 'INSERT into user (id,facebook,picture,name,first_name, last_name, accessed,created, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                        let params = [user.id, user.facebook, user.picture, user.name, profile.first_name, profile.last_name, user.accessed, user.created, user.email];
                        promises.push(client.execute(query, params, { prepare: true }));
                        return Promise.all(promises);
                    })
                    .then(resp => {
                        let query = 'SELECT * FROM user where id=?';
                        return client.execute(query, [user.id], { prepare: true });
                    })
                    .then((result) => {
                        req.user = result.rows[0];
                        res.send({ token: auth.createJWT(req.user) });
                    })
                    .catch(err => {
                        res.send(500, err);
                    })
            }
        });
    }

    api.get('/auth/facebook/exchange', function(req, res, next) {
        refreshToken(req.query.token)
            .then(accessToken => {
                getFbData(accessToken, req, res, next);
            })
            .catch(err => {
                res.send(400, err);
            })
    })

    function refreshToken(token) {
        return new Promise((resolve, reject) => {

            let accessTokenUrl = 'https://graph.facebook.com/v2.8/oauth/access_token?grant_type=fb_exchange_token&client_id=' + config.FACEBOOK_CLIENT_ID + '&client_secret=' + config.FACEBOOK_SECRET + '&fb_exchange_token=' + token;

            let options = {
                url: accessTokenUrl,
                json: true,
                headers: {
                    Authorization: 'Bearer ' + token
                },
            }
            request.get(options, (err, response, accessToken) => {
                if (err) console.log("err: ", err);
                if (accessToken.error)
                    reject(400, accessToken);
                else {
                    resolve(accessToken);
                }
            });
        })
    }

};