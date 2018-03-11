class ConversationController {
    constructor($scope, $timeout) {
        'ngInject';

        this.$scope = $scope;
        this.$timeout = $timeout;
        this.messages = [
            {id: 1, message: 'Hi'},
            {id: 1, message: 'Wassup!'},
            {id: 2, message: 'Hello!'},
            {id: 1, message: 'How are you?'},
            {id: 1, message: 'Do you have time to talk?'},
            {id: 1, message: 'I need only 5 mins?'},
            {id: 1, message: 'Ok take 10 min'} ,           
            {id: 2, message: 'I am good, how about you?'},
            {id: 2, message: 'Yes, We can talk tell me?'},
            {id: 1, message: 'I am good too. Thanks for asking.'},
            {id: 2, message: 'Ok, What are you doing this weekend?'}
        ]
        this.userText = '';
        this.bgLogo = require('./logo-chat.png');
        this.send = require('./send-message.png');
        
    }

    $onInit () {
        // this.messages = this.processMessages(this.messages);
    }

    processMessages (messages)  {
        // messages.reduce((old_v, new_v) => {
        //     if(old_v.id == new_v.id)

        // })
        // return messageObj;
    }

    sendMessage ()  {
        let count = 0;
        let msg_txt = this.userText;
        this.userText = '';
        this.messages.push({ id: 1, message: msg_txt});
        
        // attach random message from receiver.
        this.$timeout(() => {
            this.messages.push({ id: 2, message: 'New Message ' + count });
            count++;
        }, 400);
    }
}

export default ConversationController;
