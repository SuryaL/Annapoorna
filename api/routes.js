module.exports = function(app){
    require('./user')(app);
    require('./menu')(app);
    require('./order')(app);
    require('./vote')(app);
    require('./status')(app);
}