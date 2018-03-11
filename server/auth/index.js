const auth    = require ('./auth.controller');

module.exports = function(api) {

    require('./facebook')(api);
}