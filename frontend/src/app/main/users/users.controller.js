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
        // this.usersList = [{
        //         id: 1,
        //         first_name: 'Surya',
        //         last_name: 'L',
        //         week_voted: true,
        //         week_ordered: true,
        //         owes: 100.00,
        //         payment_history: [{
        //             date: 'Feb 20',
        //             amount: 40.99,
        //             type: 'paid'
        //         }, {
        //             date: 'Feb 20',
        //             amount: 40.99,
        //             type: 'paid'
        //         }, {
        //             date: 'Feb 20',
        //             amount: 40.99,
        //             type: 'paid'
        //         }, {
        //             date: 'Feb 21',
        //             amount: 40.99,
        //             type: 'paid'
        //         }, {
        //             date: 'Feb 16',
        //             amount: 40.99,
        //             type: 'paid'
        //         }]
        //     }, {
        //         id: 2,
        //         first_name: 'Sravanthi',
        //         last_name: 'L',
        //         week_voted: true,
        //         week_ordered: false,
        //         owes: 100.00,
        //         payment_history: [{
        //             date: 'Feb 20',
        //             amount: 40.99,
        //             type: 'paid'
        //         }, {
        //             date: 'Feb 20',
        //             amount: 40.99,
        //             type: 'paid'
        //         }, {
        //             date: 'Feb 20',
        //             amount: 40.99,
        //             type: 'paid'
        //         }, {
        //             date: 'Feb 21',
        //             amount: 40.99,
        //             type: 'paid'
        //         }, {
        //             date: 'Feb 16',
        //             amount: 40.99,
        //             type: 'paid'
        //         }]
        //     },
        //     {
        //         id: 3,
        //         first_name: 'Yashwanth',
        //         last_name: 'L',
        //         week_voted: false,
        //         week_ordered: false,
        //         owes: 10.00,
        //         payment_history: [{
        //             date: 'Feb 20',
        //             amount: 40.99,
        //             type: 'paid'
        //         }, {
        //             date: 'Feb 20',
        //             amount: 40.99,
        //             type: 'paid'
        //         }]
        //     }
        // ]


        this.footerText = "users";
        this.init();
        // this.btnText = "Add";
    }

    init() {
        this.PaymentService
            .getAllUsersBalances()
            .then((resp) => {
                this.usersList = resp;
                // console.log(resp);
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
        let data = pay_arr.map(pay_item => ({
            user: pay_item.id,
            amount: pay_item.pay_amount
        }))
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