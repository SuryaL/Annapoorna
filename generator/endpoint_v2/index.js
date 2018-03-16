'use strict';

const auth        = require('stax2/backend/oauth/access');
const handleReq   = require('../../../util').handleReq;
const <%= name %> = require('./<%= name %>.controller');

module.exports = api => {

    // If you want to have additional security settings you can use the following :
    // auth.isAuthenticated - Verifies token and attaches the user id to req.user.id
    // auth.isAuthenticatedWithUser - Makes an additional call to the db to get the user object and attach to req.user
    // auth.hasRole('admin'[, 'developer']) - specified in config/environment for role and subrole respectively
    // auth.hasAccess(true/false[, 'user']) - super boolean and optionally list<text> access in the user table row
    api.post('/v/1/<%= name %>',    auth.isAuthenticated(), handleReq(<%= name %>.create));
    api.get('/v/1/<%= name %>',     auth.isAuthenticated(), handleReq(<%= name %>.find));
    api.get('/v/1/<%= name %>/:id', auth.isAuthenticated(), handleReq(<%= name %>.findOne));
    api.put('/v/1/<%= name %>/:id', auth.isAuthenticated(), handleReq(<%= name %>.update));
    api.del('/v/1/<%= name %>/:id', auth.isAuthenticated(), handleReq(<%= name %>.remove));

};
