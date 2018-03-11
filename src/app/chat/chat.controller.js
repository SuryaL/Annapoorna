class ChatController {
    constructor(conversationService, $rootScope) {
        'ngInject';
        this.send = require('./new-message.png');
        this.randomPics = ['https://images1.dallasobserver.com/imager/u/745x420/10173746/https_3a_2f_2fcdn.evbuc.com_2fimages_2f38672881_2f158831051741_2f1_2foriginal.jpg_h_200_w_450_rect_0_2c1_2c4188_2c2094_s_d320c3ea70a8204d40cd4d2e526a3085',
'https://mangajam.com/wp-content/uploads/part173/how_draw_luffy-kid_one_piece.jpg',
'https://images1.dallasobserver.com/imager/u/745x420/10173746/https_3a_2f_2fcdn.evbuc.com_2fimages_2f38672881_2f158831051741_2f1_2foriginal.jpg_h_200_w_450_rect_0_2c1_2c4188_2c2094_s_d320c3ea70a8204d40cd4d2e526a3085',
'https://imgs.tuts.dragoart.com/how-to-draw-a-chibi-luffy-from-one-piece_1_000000017013_5.jpg',
'https://qph.ec.quoracdn.net/main-qimg-fc37a03c304444c776d15a38f9dcf39c'];


        
        this.conversationsList = [];
        this.conversationService= conversationService;
        // console.log(this.conversationService)
        this.conversationService.getAllConversations($rootScope.user.email)
        .then((resp)=>{
            // console.log(resp);
            this.conversationsList = resp;
            if(!!this.converstaionList && this.converstaionList.length >0){
                this.conversationsList.forEach((ele)=>{
                    let index = Math.floor(Math.random() * 4)
                    ele.image = this.randomPics[index];
                    // ele.name= 'srav';
                    })
            }
            else{
                this.conversationsList = [
                    {
                        senderName :'abc',
                        name :'Harshit',
                        senderId : '2',
                        receiverId: '1',
                        image : 'https://images1.dallasobserver.com/imager/u/745x420/10173746/https_3a_2f_2fcdn.evbuc.com_2fimages_2f38672881_2f158831051741_2f1_2foriginal.jpg_h_200_w_450_rect_0_2c1_2c4188_2c2094_s_d320c3ea70a8204d40cd4d2e526a3085',
                        receiverImage :'https://s-media-cache-ak0.pinimg.com/originals/78/95/d3/7895d38d206da624022ae2fa9d4f1832.jpg',
        
                    },
                    {
                        senderName :'abcd',
                        name :'Sravanthi',
                        senderId : '3',
                        receiverId: '1',
                        image : 'https://imgs.tuts.dragoart.com/how-to-draw-a-chibi-luffy-from-one-piece_1_000000017013_5.jpg',
                        receiverImage :'https://s-media-cache-ak0.pinimg.com/originals/78/95/d3/7895d38d206da624022ae2fa9d4f1832.jpg',
        
                    },
                    {
                        senderName :'abcde',
                        name :'Gujjula',
                        senderId : '4',
                        receiverId: '1',
                        image : 'https://mangajam.com/wp-content/uploads/part173/how_draw_luffy-kid_one_piece.jpg',
                        receiverImage :'https://s-media-cache-ak0.pinimg.com/originals/78/95/d3/7895d38d206da624022ae2fa9d4f1832.jpg',
        
                    },{
                        senderName :'abcdef',
                        name :'Neeraj',
                        senderId : '1',
                        receiverId: '1',
                        image : 'https://qph.ec.quoracdn.net/main-qimg-fc37a03c304444c776d15a38f9dcf39c',
                        receiverImage :'https://s-media-cache-ak0.pinimg.com/originals/78/95/d3/7895d38d206da624022ae2fa9d4f1832.jpg',
        
                    },
                    {
                        senderName :'abc',
                        name :'Surya',
                        senderId : '2',
                        receiverId: '1',
                        image : 'https://images1.dallasobserver.com/imager/u/745x420/10173746/https_3a_2f_2fcdn.evbuc.com_2fimages_2f38672881_2f158831051741_2f1_2foriginal.jpg_h_200_w_450_rect_0_2c1_2c4188_2c2094_s_d320c3ea70a8204d40cd4d2e526a3085',
                        receiverImage :'https://s-media-cache-ak0.pinimg.com/originals/78/95/d3/7895d38d206da624022ae2fa9d4f1832.jpg',
        
                    },
                    {
                        senderName :'abcd',
                        name :'Chase',
                        senderId : '3',
                        receiverId: '1',
                        image : 'https://imgs.tuts.dragoart.com/how-to-draw-a-chibi-luffy-from-one-piece_1_000000017013_5.jpg',
                        receiverImage :'https://s-media-cache-ak0.pinimg.com/originals/78/95/d3/7895d38d206da624022ae2fa9d4f1832.jpg',
        
                    },
                    {
                        senderName :'abcde',
                        name :'James',
                        senderId : '4',
                        receiverId: '1',
                        image : 'https://qph.ec.quoracdn.net/main-qimg-fc37a03c304444c776d15a38f9dcf39c',
                        receiverImage :'https://qph.ec.quoracdn.net/main-qimg-fc37a03c304444c776d15a38f9dcf39c',
        
                    },{
                        senderName :'abcdef',
                        name :'Yash',
                        senderId : '1',
                        receiverId: '1',
                        image : 'https://qph.ec.quoracdn.net/main-qimg-fc37a03c304444c776d15a38f9dcf39c',
                        receiverImage :'https://s-media-cache-ak0.pinimg.com/originals/78/95/d3/7895d38d206da624022ae2fa9d4f1832.jpg',
        
                    },{
                        senderName :'abc',
                        name :'Twameka',
                        senderId : '2',
                        receiverId: '1',
                        image : 'https://images1.dallasobserver.com/imager/u/745x420/10173746/https_3a_2f_2fcdn.evbuc.com_2fimages_2f38672881_2f158831051741_2f1_2foriginal.jpg_h_200_w_450_rect_0_2c1_2c4188_2c2094_s_d320c3ea70a8204d40cd4d2e526a3085',
                        receiverImage :'https://s-media-cache-ak0.pinimg.com/originals/78/95/d3/7895d38d206da624022ae2fa9d4f1832.jpg',
        
                    },
                    {
                        senderName :'abcd',
                        name :'VK',
                        senderId : '3',
                        receiverId: '1',
                        image : 'https://imgs.tuts.dragoart.com/how-to-draw-a-chibi-luffy-from-one-piece_1_000000017013_5.jpg',
                        receiverImage :'https://s-media-cache-ak0.pinimg.com/originals/78/95/d3/7895d38d206da624022ae2fa9d4f1832.jpg',
        
                    },
                    {
                        senderName :'abcde',
                        name :'Kishore',
                        senderId : '4',
                        receiverId: '1',
                        image : 'https://mangajam.com/wp-content/uploads/part173/how_draw_luffy-kid_one_piece.jpg',
                        receiverImage :'https://s-media-cache-ak0.pinimg.com/originals/78/95/d3/7895d38d206da624022ae2fa9d4f1832.jpg',
        
                    },
                    {
                        senderName :'abcd',
                        name :'sravanthi',
                        senderId : '3',
                        receiverId: '1',
                        image : 'https://imgs.tuts.dragoart.com/how-to-draw-a-chibi-luffy-from-one-piece_1_000000017013_5.jpg',
                        receiverImage :'https://s-media-cache-ak0.pinimg.com/originals/78/95/d3/7895d38d206da624022ae2fa9d4f1832.jpg',
        
                    },
                    {
                        senderName :'abcde',
                        name :'sravanthi',
                        senderId : '4',
                        receiverId: '1',
                        image : 'https://mangajam.com/wp-content/uploads/part173/how_draw_luffy-kid_one_piece.jpg',
                        receiverImage :'https://s-media-cache-ak0.pinimg.com/originals/78/95/d3/7895d38d206da624022ae2fa9d4f1832.jpg',
        
                    }
                ];
            }
                
        })
        .catch((err)=>{
            console.log(err)

        })
        
    }
}

export default ChatController;
