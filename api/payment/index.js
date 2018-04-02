const controller = require('./payment.controller')
const {handleReq} =  require('../../helpers/utils/communication_utils');
const endpoint_name = "/payment"
const auth = require('../../auth/auth.controller');

module.exports = app =>  {
    app.post(endpoint_name + '/addPayments', auth.isAuthenticated(), auth.hasRole('admin'),handleReq(controller.addUserPayments))
    app.get(endpoint_name + '/getAllUsersBalances', auth.isAuthenticated(), auth.hasRole('admin'),handleReq(controller.getAllUsersBalances))
    app.get(endpoint_name + '/getUserBalance', auth.isAuthenticated(), handleReq(controller.getUserBalance))
    // app.post(endpoint_name, auth.isAuthenticated(), auth.hasRole('admin'),handleReq(controller.create))
    // app.get(endpoint_name, auth.isAuthenticated(), auth.hasRole('admin'),handleReq(controller.find))
    // app.put(endpoint_name + "/:id", auth.isAuthenticated(), auth.hasRole('admin'),handleReq(controller.update))
    // app.delete(endpoint_name + "/:id", auth.isAuthenticated(), auth.hasRole('admin'),handleReq(controller.remove))
}

