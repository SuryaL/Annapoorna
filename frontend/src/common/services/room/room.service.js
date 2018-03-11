import socketio from 'socket.io-client';
export default class roomService {
    constructor( $http, $rootScope ) {
        'ngInject';
        this.base_url = 'http://localhost:3001';
        this.rooms = [];
        this.$http = $http;
        this.$rootScope = $rootScope;
        // fetch
        this.getRooms();
        this.clearCurrentChatInfo();


        this.socket = socketio.connect( 'http://localhost:3000' );
        this.socket.on( 'message', ( data ) => {
            console.log( data );
            this.addToCurrentChat(data)
            this.$rootScope.$apply();
            // socket.emit( 'my other event', {
            //     my: 'data'
            // } );
        } );
    }

    getRooms() {
        // get rooms from backend and store in this.rooms

        this.rooms = [ {
            _id: '1',
            name: 'Development',
            description: 'Join this room to discuss about Web Development'
        }, {
            _id: '2',
            name: 'Banter',
            description: 'Feel free to chat about any topic in this room'
        }, {
            _id: '3',
            name: 'Books',
            description: 'Use this room to chat about books'
        } ]
    }

    findRoom( id ) {
        return this.rooms.find( ( room ) => {
            console.log()
            return room._id == id
        } )
    }

    getRoomChat( room_id ) {
        // get room chat list
        return this.$http.get( `${this.base_url}/room_chat`, {
                params: {
                    room_id
                }
            } )
            .then( ( resp ) => {
                this.currentChatInfo.chat = resp.data;
                this.currentChatInfo.current_room_id = room_id;

            } )
            .catch( ( err ) => {
                console.error( err )
            } )
            //     // temporary
            //     this.currentChatInfo = {
            //         chat: [ {
            //             name: 'someone',
            //             message: 'hello',
            //             room_id: room_id,
            //             date: (new Date()).toISOString()
            //         }, {
            //             name: 'someone',
            //             message: 'hello',
            //             room_id: room_id,
            //             date: (new Date()).toISOString()
            //         }, {
            //             name: 'someone',
            //             message: 'hello',
            //             room_id: room_id,
            //             date: (new Date()).toISOString()
            //         }, {
            //             name: 'someone',
            //             message: 'hello',
            //             room_id: room_id,
            //             date: (new Date()).toISOString()
            //         }, {
            //             name: 'someone',
            //             message: 'hello',
            //             room_id: room_id,
            //             date: (new Date()).toISOString()
            //         }, {
            //             name: 'someone',
            //             message: 'hello',
            //             room_id: room_id,
            //             date: (new Date()).toISOString()
            //         }, {
            //             name: 'someone',
            //             message: 'hel1lo',
            //             room_id: room_id,
            //             date: (new Date()).toISOString()
            //         }, {
            //             name: 'someone',
            //             message: 'hel2lo',
            //             room_id: room_id,
            //             date: (new Date()).toISOString()
            //         } ],
            //         current_room_id: room_id
            //     }
    }

    sendMessage( {
        room_id,
        name,
        message
    } ) {
        let date = ( new Date() )
            .toISOString();
        this.addToCurrentChat( {
                room_id,
                name,
                message,
                date
            } )
            // send message 

        this.socket.emit( 'message', {
            room_id,
            name,
            message,
            date
        } );

        // return this.$http.post( `${this.base_url}/message`, {

        //         room_id,
        //         name,
        //         message,
        //         date
        //     } )
        //     .then( ( resp ) => {
        //         console.log( "sent", {
        //                 room_id,
        //                 name,
        //                 message,
        //                 date
        //             } )
        //             // this.currentChatInfo.chat = resp.data;
        //             // this.currentChatInfo.current_room_id = room_id;

        //     } )
        //     .catch( ( err ) => {
        //         console.error( err )
        //     } )
        // refresh current chat
    }

    // receivedMessaged( {
    //     room_id,
    //     name,
    //     message,
    //     date
    // } ) {
    //     this.addToCurrentChat( {
    //         room_id,
    //         name,
    //         message,
    //         date
    //     } )
    // }

    addToCurrentChat( {
        room_id,
        name,
        message,
        date
    } ) {
        if ( room_id && this.currentChatInfo.current_room_id == room_id ){
        // add immediately
            this.currentChatInfo.chat.unshift( {
            room_id,
            name,
            message,
            date
        } )
            console.log( this.currentChatInfo.chat)
        }


    }

    clearCurrentChatInfo() {
        this.currentChatInfo = {
            room_id: null,
            chat: []
        }
    }
}

