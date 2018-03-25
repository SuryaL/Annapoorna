const controller = require('./vote.controller')
const {handleReq} = require('../../helpers/utils/communication_utils');
const endpoint_name = "/vote";
const auth = require('../../auth/auth.controller');


module.exports = app =>  {
    app.post(endpoint_name,auth.isAuthenticated(), handleReq(controller.create))
    app.get(endpoint_name,auth.isAuthenticated(),handleReq(controller.find))
    app.get(endpoint_name+'/getMajority',auth.isAuthenticated(),handleReq(controller.getMajority))
    app.put(endpoint_name + "/:id", handleReq(controller.update))
    app.delete(endpoint_name + "/:id", handleReq(controller.remove))
}

