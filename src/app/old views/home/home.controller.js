class homeCtrl {
    constructor($state, roomService) {
        'ngInject';
        this.$state = $state;
        this.roomService = roomService;
        this.roomService.clearCurrentChatInfo();
    }

    roomSelected(room){
        // selected room 
        this.$state.go('app.room',{room_id : room._id});
    }
}

export default homeCtrl;

