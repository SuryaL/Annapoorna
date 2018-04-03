const controller = require('./order.controller')
const {handleReq} =  require('../../helpers/utils/communication_utils');
const auth = require('../../auth/auth.controller');
const endpoint_name = "/order"

module.exports = app =>  {
    app.get(endpoint_name + "/getMyOrder",auth.isAuthenticated(), handleReq(controller.getUserOrder))
    app.get(endpoint_name + "/getAllOrders",auth.isAuthenticated(), auth.hasOneRole(['admin','cook']), handleReq(controller.getAllUsersOrders))
    app.get(endpoint_name + "/getMyOrders",auth.isAuthenticated(), handleReq(controller.getAllUserOrders))
    app.post(endpoint_name + "/createMyOrder",auth.isAuthenticated(), handleReq(controller.createUserOrder))
    
    // app.post(endpoint_name,auth.isAuthenticated(), handleReq(controller.create))
    // app.get(endpoint_name,auth.isAuthenticated(), handleReq(controller.find))
    // app.put(endpoint_name + "/:id", handleReq(controller.update))
    // app.delete(endpoint_name + "/:id", handleReq(controller.remove))
}

