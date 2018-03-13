const auth    = require ('./auth.controller');

module.exports = function(api) {

    require('./facebook')(api);
    api.get ('/auth/exchange', auth.isAuthenticated(), auth.exchange);
}