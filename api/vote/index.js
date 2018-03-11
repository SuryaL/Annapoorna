const controller = require('./vote.controller')
const endpoint_name = "/vote"


module.exports = app =>  {
    app.post(endpoint_name, controller.create)
    app.get(endpoint_name, controller.find)
    app.put(endpoint_name + "/:id", controller.update)
}

