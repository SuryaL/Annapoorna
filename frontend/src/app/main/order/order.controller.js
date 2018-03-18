class OrderController {
    constructor($state, $auth, VoteService) {
        'ngInject';
        Object.assign(this, { $state, $auth, VoteService });
        this.user = {};
        this.headTitle = 'Order this week\'s dishes';
        this.subheadTitle = '8.8.88';
        this.orderItems = [{ "itemName": "Runolfsson, Bergnaum and Jacobs asd kalsjldk jaslkjd lkasjd lkjasldk jaslkd jaskld jas"},
            { "itemName": "Barton-Goldner"},
            { "itemName": "Luettgen-Strosin"},
            { "itemName": "Koepp, Crooks and Stiedemann"},
            { "itemName": "O'Keefe-Kovacek"},
            { "itemName": "Bergnaum Inc"},
            { "itemName": "Rohan Group"},
            { "itemName": "Balistreri Inc"},
            { "itemName": "Denesik and Sons"},
            { "itemName": "Swaniawski and Sons"},
            { "itemName": "Altenwerth, Moore and Kerluke"},
            { "itemName": "Rolfson, Jones and Kihn"},
            { "itemName": "Wolff-Reichel"},
            { "itemName": "Gutkowski-Bahringer"},
            { "itemName": "Baumbach Inc"}]
        this.footerText = "order";
        this.getVotedItems();

    }

    order() {
        console.log(this.orderItems);
        // this.VoteService.find()
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