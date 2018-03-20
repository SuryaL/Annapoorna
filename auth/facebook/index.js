'use strict';

const config = require('../../config');
const jwt = require('jwt-simple');
const auth = require('../auth.controller');
const request = require('request');
const uuid = require('node-uuid');
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
            // console.log('Access Token: ', accessToken);

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
            let user = {};
            user.id = uuid.v4();
            user.facebook = profile.id;
            user.image = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
            user.email = profile.email;
            // user.gender = (profile.gender) ? profile.gender : null;
            user.accessed_portal = new Date().toISOString();
            user.created = new Date().toISOString();

            user.first_name = profile.first_name;
            user.last_name = profile.last_name;
            console.log('Email: ', profile.email);
            client.execute('SELECT * FROM user where email = ? allow FILTERING', [profile.email], { prepare: true })
                .then(function(results) {
                    if (results.rows.length <= 0) {
                        throw new Error('No access. Contact admin.')
                        // user.type = ['user'];
                        // user.super = false;
                        // user.deleted = false;
                        // let query = 'INSERT INTO user JSON ?'
                        // let params = JSON.stringify(user);
                        // return client.execute(query, [params], { prepare: true });
                    } else {
                        user = results.rows[0];
                        user.facebook = profile.id;
                        user.image = user.image || 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
                        user.email = user.email || profile.email;
                        user.accessed_portal = new Date().toISOString();
                        user.first_name = profile.first_name;
                        user.last_name = profile.last_name;
                        if (user.deleted == null) user.deleted = false;
                        if (user.super == null) user.super = false;
                        if (user.type == null) user.type = ['user'];

                        let query = 'UPDATE user SET facebook=?, accessed_portal=?, email=?, image=?, first_name=?, last_name=?, deleted=?, super=?, type=? WHERE id=?';
                        let params = [user.facebook, user.accessed_portal, user.email, user.image, user.first_name, user.last_name, user.deleted, user.super, user.type, user.id];
                        return client.execute(query, params, { prepare: true })
                    }
                })
                .then(resp => {
                    let query = 'SELECT * FROM user where id=?';
                    return client.execute(query, [user.id], { prepare: true });
                })
                .then((result) => {
                    req.user = result.rows[0];
                    delete req.user.password;
                    res.send({
                        token: {
                            access_token: auth.createJWT(req.user),
                            user: req.user
                        }
                    });
                })
                .catch(errr => {
                    return res.send(500, errr);
                })

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