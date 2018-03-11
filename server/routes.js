module.exports = function(app){
    require('./api/user')(app);
    require('./api/menu')(app);
    require('./api/vote')(app);
    require('./api/order')(app);
    require('./api/status')(app);
}