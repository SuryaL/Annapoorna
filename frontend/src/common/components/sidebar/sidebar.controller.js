class SidebarController {
    constructor($state) {
        this.$state = $state;
        'ngInject';

    }
    showConversation(conversation_item){
    
        this.$state.go('app.chat.conversation',{item :conversation_item});
            
    }
}

export default SidebarController;
