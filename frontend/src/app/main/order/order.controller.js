class OrderController {
    constructor($state, $auth, VoteService) {
        'ngInject';
        Object.assign(this, { $state, $auth, VoteService });
        this.user = {};
        this.headTitle = 'Order this week\'s dishes';

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
        this.getVotedItems();
        this.order_deadline = '03-20-2018';
    }

    get subheadTitle(){
        return 'Deadline : ' + this.order_deadline.replace(/-/g,'.')
    }

    orderClicked = () => {
        console.log('order');
        // this.MenuService.find()
        //     .then(resp => {
        //         console.log(resp);
        //     })
    }
    
    getVotedItems(){
        console.log('i am hete ', this.VoteService)
        this.VoteService.find()
         .then((result)=>{
             console.log(result);
             if(!result || result.length < 0) return;
             if(result.length > 0){
                 result.forEach(item => {
                     return item;
                 });
                 this.voteItems = result;
                 // console.log(this.voteItems)
             }
         })
         .catch(err => console.log(err));
     }
}

export default OrderController;