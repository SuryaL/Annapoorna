const bodyParser = require('body-parser');
const cors = require('cors');
module.exports = function(app){
    app.use(bodyParser.json());
    app.use(cors({
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS".split(','),
        "allowedHeaders": "Content-Type,Authorization,Cache-Control,appversionnumber".split(','),
        "preflightContinue": true,
    }));
    app.use(function(req, res, next) {
        //intercepts OPTIONS method
        if ('OPTIONS' === req.method) {
            //respond with 200
            res.send(200);
        } else {
            //move on
            next();
        }
    })
}