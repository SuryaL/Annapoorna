class roomCtrl {
    constructor($state, roomService, $stateParams) {
        'ngInject';
        this.$state = $state;
        this.roomService = roomService;
        this.room_id = $stateParams.room_id;
        this.roomService.clearCurrentChatInfo();
        this.roomService.getRoomChat(this.room_id);
        console.log($stateParams,(this.roomService.findRoom(this.room_id)))
    }

    submitMessage(){
       console.log(this.name, this.message, this.room_id)
       this.roomService.sendMessage({
        name:this.name, message:this.message, room_id: this.room_id
       })
       this.message = "";
    }

    showDate(date){
        return (new Date(date)).toLocaleString();
    }
}

export default roomCtrl;

