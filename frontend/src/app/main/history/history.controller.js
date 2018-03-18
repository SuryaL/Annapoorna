class HistoryController {
    constructor($state, $auth, MenuService) {
        'ngInject';
        Object.assign(this, {
            $state,
            $auth,
            MenuService
        });
        this.user = {};
        this.headTitle = 'History';
        this.subheadTitle = '-';

        this.btnText = "history";
        this.historyItems = [{
                weekTitle: "Feb 23",
                ordersList: [{
                        "item": "asd erf ftgyh ujil thwyidjak asd erf ftgyh ujil thwyidjak",
                        "quantity": 2,
                        price: 7.99
                    },
                    {
                        "item": "asd erf ftgyh ujil thwyidjak asd erf ftgyh ujil thwyidjak",
                        "quantity": 2,
                        price: 7.99
                    }, {
                        "item": "asd erf ftgyh ujil thwyidjak asd erf ftgyh ujil thwyidjak",
                        "quantity": 2,
                        price: 7.99
                    }, {
                        "item": "asd erf ftgyh ujil thwyidjak asd erf ftgyh ujil thwyidjak",
                        "quantity": 2,
                        price: 7.99
                    }
                ],
                totalPrice: 23
            }, {
                weekTitle: "Feb 23",
                ordersList: [{
                        "item": "asd erf ftgyh ujil thwyidjak asd erf ftgyh ujil thwyidjak",
                        "quantity": 2,
                        price: 7.99
                    },
                    {
                        "item": "asd erf ftgyh ujil thwyidjak asd erf ftgyh ujil thwyidjak",
                        "quantity": 2,
                        price: 7.99
                    }, {
                        "item": "asd erf ftgyh ujil thwyidjak asd erf ftgyh ujil thwyidjak",
                        "quantity": 2,
                        price: 7.99
                    }, {
                        "item": "asd erf ftgyh ujil thwyidjak asd erf ftgyh ujil thwyidjak",
                        "quantity": 2,
                        price: 7.99
                    }
                ],
                totalPrice: 23
            },
            {
                weekTitle: "Feb 23",
                ordersList: [{
                        "item": "asd erf ftgyh ujil thwyidjak asd erf ftgyh ujil thwyidjak",
                        "quantity": 2,
                        price: 7.99
                    },
                    {
                        "item": "asd erf ftgyh ujil thwyidjak asd erf ftgyh ujil thwyidjak",
                        "quantity": 2,
                        price: 7.99
                    }, {
                        "item": "asd erf ftgyh ujil thwyidjak asd erf ftgyh ujil thwyidjak",
                        "quantity": 2,
                        price: 7.99
                    }, {
                        "item": "asd erf ftgyh ujil thwyidjak asd erf ftgyh ujil thwyidjak",
                        "quantity": 2,
                        price: 7.99
                    }
                ],
                totalPrice: 23
            }
        ]

    }


}

export default HistoryController;