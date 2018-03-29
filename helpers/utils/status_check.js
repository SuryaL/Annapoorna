const StatusService = require('../../api/status/status.service');
let enable = true;
async function checkStatus(){
    if(!enable){
        //keep adding timeouts
        // return;
    }else{
        await StatusService.checkStatus();
    }
    setTimeout(()=>{
        checkStatus();
    },60000)
};

module.exports ={
    checkStatus
}