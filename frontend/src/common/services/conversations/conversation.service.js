export default class conversationService {
    constructor( $http, $rootScope ) {
        'ngInject';
        // this.base_url = 'http://localhost:3000';
        this.conversations = [];
        this.$http = $http;
        this.$rootScope = $rootScope;
        // fetch
        // this.getAllConversations('email_id');
    }

    // getconversations() {
    //     // get conversations from backend and store in this.conversations

    //     this.conversations = [ {
    //         _id: '1',
    //         name: 'Development',
    //         description: 'Join this conversation to discuss about Web Development'
    //     }, {
    //         _id: '2',
    //         name: 'Banter',
    //         description: 'Feel free to chat about any topic in this conversation'
    //     }, {
    //         _id: '3',
    //         name: 'Books',
    //         description: 'Use this conversation to chat about books'
    //     } ]
        
    // }

    

    getAllConversations( email_id ) {
        // get conversation chat list
        console.log(' at service')
        return this.$http({
            method:'POST',
            url:  this.$rootScope.baseURL + '/login',
            data: {
                privatekey: this.$rootScope.user.privatekey,
                password: 'this.$rootScope.user.password'
            }
        }).then(()=>{
            return this.$http.get( `${this.$rootScope.baseURL}/conversations/${email_id}`)
        }).then( ( resp ) => {
                let arr = Object.keys(resp.data).map((em)=>{
                    resp.data[em] = em;
                    return resp.data[em];
                })
                console.log(arr);
                let conversations = [];
                return arr

            } )
            .catch( ( err ) => {
                console.error( err )
            } )
    }

   
}

