const MyToastrService = class MyToastrService {
    constructor(toastr,$timeout) {
        'ngInject';
        this.toastr = toastr;
        this.$timeout = $timeout ;
        this.toast_timeout = 0;
    }

    success(msg,timeout = this.toast_timeout){
        this.$timeout(()=>{
            this.toastr.success(msg);
        },timeout)
    }
    info(msg,timeout = this.toast_timeout){
        this.$timeout(()=>{
            this.toastr.info(msg);
        },timeout)
    }

    error(msg,timeout = this.toast_timeout){
        this.$timeout(()=>{
            this.toastr.error(msg);
        },timeout)
    }

    warning(msg,timeout = this.toast_timeout){
        this.$timeout(()=>{
            this.toastr.warning(msg);
        },timeout)
    }
};

export default MyToastrService;
