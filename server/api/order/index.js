const controller = require('./order.controller')
const handleReq = require('../utils').handleReq;
const endpoint_name = "/order"

module.exports = app =>  {
    app.post(endpoint_name, handleReq(controller.create))
    app.get(endpoint_name, handleReq(controller.find))
    app.put(endpoint_name + "/:id", handleReq(controller.update))
    app.delete(endpoint_name + "/:id", handleReq(controller.remove))
}

