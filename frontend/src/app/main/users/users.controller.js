class UsersController {
    constructor($state, $auth, $popup, UserService, AddUserPopup) {
        'ngInject';
        Object.assign(this, {
            $state,
            $auth,
            $popup,
            UserService,
            AddUserPopup
        });
        this.user = {};
        this.headTitle = 'Users List';


        // NOTE:
        // active(not deleted) and admin added users only
        this.usersList = [{
                id: 1,
                first_name: 'Surya',
                last_name: 'L',
                week_voted: true,
                week_ordered: true,
                owes: 100.00,
                payment_history: [{
                    date: 'Feb 20',
                    amount: 40.99,
                    type: 'paid'
                }, {
                    date: 'Feb 20',
                    amount: 40.99,
                    type: 'paid'
                }, {
                    date: 'Feb 20',
                    amount: 40.99,
                    type: 'paid'
                }, {
                    date: 'Feb 21',
                    amount: 40.99,
                    type: 'paid'
                }, {
                    date: 'Feb 16',
                    amount: 40.99,
                    type: 'paid'
                }]
            }, {
                id: 2,
                first_name: 'Sravanthi',
                last_name: 'L',
                week_voted: true,
                week_ordered: false,
                owes: 100.00,
                payment_history: [{
                    date: 'Feb 20',
                    amount: 40.99,
                    type: 'paid'
                }, {
                    date: 'Feb 20',
                    amount: 40.99,
                    type: 'paid'
                }, {
                    date: 'Feb 20',
                    amount: 40.99,
                    type: 'paid'
                }, {
                    date: 'Feb 21',
                    amount: 40.99,
                    type: 'paid'
                }, {
                    date: 'Feb 16',
                    amount: 40.99,
                    type: 'paid'
                }]
            },
            {
                id: 3,
                first_name: 'Yashwanth',
                last_name: 'L',
                week_voted: false,
                week_ordered: false,
                owes: 10.00,
                payment_history: [{
                    date: 'Feb 20',
                    amount: 40.99,
                    type: 'paid'
                }, {
                    date: 'Feb 20',
                    amount: 40.99,
                    type: 'paid'
                }]
            }
        ]
        this.subheadTitle = `${this.usersList.length} users`;

        this.footerText = "users";
        this.btnText = "Add";
    }

    btnClicked = () => {
        let mypop = this.AddUserPopup.open(({action,data})=>{
            if(!data || (!!data && !data.email)) return;
            this.UserService.create({data})
                .then(resp => {
                    console.log(resp);
                })
                .catch(err => console.log(err));
        });
    

    }

}

export default UsersController;