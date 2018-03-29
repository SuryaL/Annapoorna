const StatusService = require('../../api/status/status.service');
let enabled = false;

function setEnable(bool){
    enabled = !!bool;
}

async function checkStatus(){
    if(!enabled){
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
    checkStatus,
    setEnable
}