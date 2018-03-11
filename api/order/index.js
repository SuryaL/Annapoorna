const controller = require('./order.controller')
const endpoint_name = "/order"


module.exports = app =>  {
    app.post(endpoint_name, controller.create)
    app.get(endpoint_name, controller.find)
    app.put(endpoint_name + "/:id", controller.update)
    app.delete(endpoint_name + "/:id", controller.remove)
}

