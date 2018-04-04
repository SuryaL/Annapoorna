class UsersController {
    constructor($state, $auth, $popup, UserService, AddUserPopup, PaymentService, MyToastr, $rootScope) {
        'ngInject';
        Object.assign(this, {
            $state,
            $auth,
            $popup,
            UserService,
            AddUserPopup,
            PaymentService,
            MyToastr,
            $rootScope
        });
        this.user = {};
        this.headTitle = 'Users List';

        this.usersList = [];
        // NOTE:
        // active(not deleted) and admin added users only

        this.footerText = "users";
        this.init();
        // this.btnText = "Add";
    }

    init() {
        this.PaymentService
            .getAllUsersBalances()
            .then((resp) => {
                this.usersList = resp;
                console.log(resp);
            })
            .catch((err)=>{
                console.error(err);
                this.MyToastr.error('Failed');
            })
    }
    get subheadTitle(){
        return `${this.usersList.length} users`;
    }

    get btnText() {
        return !this.needsPaySubmission ? 'Add' : 'Pay';
    }

    get paymentsArr() {
        return this.usersList.filter(user => +user.pay_amount);
    }

    get needsPaySubmission() {
        return this.paymentsArr.length
    }

    btnClicked = () => {
        if(!this.needsPaySubmission) {
            this.adduserPop();
        } else {
            // console.log('submit pay', this.paymentsArr);
            this.pay(this.paymentsArr);
        }
    }

    pay(pay_arr){
        let data = pay_arr.map(pay_item => {
            let amount = pay_item.pay_amount;
            if(pay_item.has_type == 'cook'){
                amount *= -1;
            }
            return ({
            user: pay_item.id,
            amount
        })
    })
        this.PaymentService
            .addPayments(data)
            .then(_ => {
                this.$rootScope.$broadcast('pay-update');
                return this.init()
            }).then(()=> this.MyToastr.success('Success'))
            .catch(console.error)
    }

    adduserPop = () => {
        let mypop = this.AddUserPopup.open(({ action, data: { type, email } }) => {
            if(!type || !email) {
                mypop.btnClicked = false;
                this.MyToastr.error(' Invalid prams');
                return;
            }
            this.UserService.create({ type, email })
                .then(resp => {
                    console.log(resp);
                    this.MyToastr.success('Success');
                    mypop.close();
                    this.init();
                })
                .catch(err => {
                    mypop.btnClicked = false;
                    this.MyToastr.error(' Failed to add user');
                    console.log(err)
                });
        });
    }

}

export default UsersController;