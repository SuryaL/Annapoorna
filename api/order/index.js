const controller = require('./order.controller')
const {handleReq} =  require('../../helpers/utils/communication_utils');
const auth = require('../../auth/auth.controller');
const endpoint_name = "/order"

module.exports = app =>  {
    app.get(endpoint_name + "/getMyOrder",auth.isAuthenticated(), auth.hasOneRole(['user']), handleReq(controller.getUserOrder))
    app.get(endpoint_name + "/getMyOrders",auth.isAuthenticated(), auth.hasOneRole(['user']), handleReq(controller.getAllUserOrders))
    app.get(endpoint_name + "/getMyMissedRatings",auth.isAuthenticated(), auth.hasOneRole(['user']), handleReq(controller.getMyMissedRatings))
    app.get(endpoint_name + "/getAllUsersOrdersWeekly",auth.isAuthenticated(), auth.hasOneRole(['admin']), handleReq(controller.getAllUsersOrdersWeekly))
    app.get(endpoint_name + "/getAllOrders",auth.isAuthenticated(), auth.hasOneRole(['admin','cook']), handleReq(controller.getAllUsersOrders))
    
    app.post(endpoint_name + "/createMyOrder",auth.isAuthenticated(), handleReq(controller.createUserOrder))
    app.post(endpoint_name + "/updateMyOrderRatings",auth.isAuthenticated(),auth.hasOneRole(['user']), handleReq(controller.updateMyOrderRatings))
    
    
    // app.post(endpoint_name,auth.isAuthenticated(), handleReq(controller.create))
    // app.get(endpoint_name,auth.isAuthenticated(), handleReq(controller.find))
    // app.put(endpoint_name + "/:id", handleReq(controller.update))
    // app.delete(endpoint_name + "/:id", handleReq(controller.remove))
}



