class voteCtrl {
    constructor($state, $auth, MenuService) {
        'ngInject';
        Object.assign(this, { $state, $auth, MenuService });
        this.user = {};
        this.headTitle = 'Vote for this week\'s dishes';
        this.subheadTitle = '8.8.88';
        this.voteItems = [{ "itemName": "Runolfsson, Bergnaum and Jacobs asd kalsjldk jaslkjd lkasjd lkjasldk jaslkd jaskld jas", "isSelected": false },
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
        this.footerText = "Vote";

    }

    vote() {
        console.log(this.voteItems);
        this.MenuService.find()
            .then(resp => {
                console.log(resp);
            })
    }

    submit() {
        console.log(this.user);
    }


}

export default voteCtrl;