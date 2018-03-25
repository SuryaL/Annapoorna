const controller = require('./status.controller')
const {handleReq} =  require('../../helpers/utils/communication_utils');
const endpoint_name = "/status"

module.exports = app =>  {
    // app.post(endpoint_name, handleReq(controller.create))
    // app.get(endpoint_name, handleReq(controller.find))
    // app.put(endpoint_name + "/:id", handleReq(controller.update))
    // app.delete(endpoint_name + "/:id", handleReq(controller.remove))
    app.get(endpoint_name + "/getCurrentWeek", handleReq(controller.getCurrentWeek))
}

