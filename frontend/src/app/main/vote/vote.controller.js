class voteCtrl {
    constructor($state, $auth) {
        'ngInject';
        Object.assign(this, { $state, $auth });
        this.user = {};
        this.headTitle = 'Vote for this weeks dishes';
        this.subheadTitle = '8.8.88';
        this.voteItems = [{ "itemName": "Runolfsson, Bergnaum and Jacobs", "isSelected": false },
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
    }

    submit() {
        console.log(this.user);
    }

    logout() {
        this.$auth.logout();
    }
}

export default voteCtrl;