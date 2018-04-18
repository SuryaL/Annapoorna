const controller = require('./payment.controller')
const {handleReq} =  require('../../helpers/utils/communication_utils');
const endpoint_name = "/payment"
const auth = require('../../auth/auth.controller');

module.exports = app =>  {
    app.post(endpoint_name + '/addPayments', auth.isAuthenticated(), auth.hasRole('admin'),handleReq(controller.addUserPayments))
    app.post(endpoint_name + '/updateUserPayment', auth.isAuthenticated(), auth.hasRole('admin'),handleReq(controller.updateUserPayment))
    
    app.post(endpoint_name + '/addPaymentUser', auth.isAuthenticated(), auth.hasRole('user'),handleReq(controller.addPaymentUser))
    
    app.get(endpoint_name + '/getAllUsersBalances', auth.isAuthenticated(), auth.hasRole('admin'),handleReq(controller.getAllUsersBalances))
    app.get(endpoint_name + '/getUserBalance', auth.isAuthenticated(), handleReq(controller.getUserBalance))
    app.get(endpoint_name + '/getCookBalance', auth.isAuthenticated(), auth.hasRole('cook'), handleReq(controller.getCookBalance))
    // app.post(endpoint_name, auth.isAuthenticated(), auth.hasRole('admin'),handleReq(controller.create))
    // app.get(endpoint_name, auth.isAuthenticated(), auth.hasRole('admin'),handleReq(controller.find))
    // app.put(endpoint_name + "/:id", auth.isAuthenticated(), auth.hasRole('admin'),handleReq(controller.update))
    // app.delete(endpoint_name + "/:id", auth.isAuthenticated(), auth.hasRole('admin'),handleReq(controller.remove))
}

