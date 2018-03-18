class OrderController {
    constructor($state, $auth, MenuService) {
        'ngInject';
        Object.assign(this, { $state, $auth, MenuService });
        this.user = {};
        this.headTitle = 'Order this week\'s dishes';
        this.subheadTitle = '8.8.88';
        this.orderItems = [{ "itemName": "Runolfsson, Bergnaum and Jacobs asd kalsjldk jaslkjd lkasjd lkjasldk jaslkd jaskld jas", "isSelected": false },
            { "itemName": "Barton-Goldner", "isSelected": false },
            { "itemName": "Luettgen-Strosin", "isSelected": false },
            { "itemName": "Koepp, Crooks and Stiedemann", "isSelected": false },
            { "itemName": "O'Keefe-Kovacek", "isSelected": false },
            { "itemName": "Bergnaum Inc", "isSelected": false },
            { "itemName": "Rohan Group", "isSelected": false },
            { "itemName": "Balistreri Inc", "isSelected": false },
            { "itemName": "Denesik and Sons", "isSelected": false },
            { "itemName": "Swaniawski and Sons", "isSelected": false },
            { "itemName": "Altenwerth, Moore and Kerluke", "isSelected": false },
            { "itemName": "Rolfson, Jones and Kihn", "isSelected": false },
            { "itemName": "Wolff-Reichel", "isSelected": false },
            { "itemName": "Gutkowski-Bahringer", "isSelected": false },
            { "itemName": "Baumbach Inc", "isSelected": false }]
        this.btnText = "order";

    }

    orderClicked = () => {
        console.log('order');
        // this.MenuService.find()
        //     .then(resp => {
        //         console.log(resp);
        //     })
    }
}

export default OrderController;