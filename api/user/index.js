const controller = require('./user.controller')
const endpoint_name = "/user"


module.exports = app =>  {
    app.post(endpoint_name, controller.create)
    app.get(endpoint_name, controller.find)
    app.put(endpoint_name + "/:id", controller.update)
    app.delete(endpoint_name + "/:id", controller.remove)
}

