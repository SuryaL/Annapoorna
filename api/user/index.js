const auth = require('../../auth/auth.controller');
const controller = require('./user.controller')
const {handleReq} =  require('../../helpers/utils/communication_utils');
const endpoint_name = "/user"

module.exports = app =>  {
    app.post(endpoint_name, auth.hasRole('admin'), handleReq(controller.create))
    app.get(endpoint_name, auth.isAuthenticated(), handleReq(controller.find))
    app.put(endpoint_name + "/:id", auth.hasRole('user'), handleReq(controller.update))
    app.delete(endpoint_name + "/:id", auth.hasRole('admin'), handleReq(controller.remove))
}

