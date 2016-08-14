
function Chat($ele, user, chat_list_data){

    $ele.html($('#chat-template').html())

    console.log('聊天初始化', $ele);
    let chat_list = new Contacts(chat_list_data, $ele.find('.contacts>.list'), $ele.find('.message'), user)

    let socket = new Socket('/socket/chat', user)

    // 接收消息
    socket.onmessage = function(data){
        /*
        {
            type: '单聊/群聊/系统消息 etc',
            data: '这是数据',
            etc
        }
        */

        if(data instanceof String) data = JSON.parse(data)
        chat_list_data.some(item => {
            if(item.id == data.id || item.id == data.receiveId){
                item.messageHistory.push(data)

                const FIRNED_ID = chat_list.activeChat ? chat_list.activeChat.friend.id : ''
                if(item.id == FIRNED_ID ||item.id == data.receiveId){
                    chat_list.activeChat.add()
                    chat_list.activeChat.scrollEnd()
                }else{
                    item.newMessage++
                }
                return true
            }
        })


    }

    // 发送消息
    const $chat_msg = $ele.find('textarea')[0]
    $ele.find('.send').on('click', function(){
        const msg = $chat_msg.value.trim()
        if(!msg) return
        // 发送数据给另外一个人
        let data = {
            receiveId: chat_list.activeChat.friend.id,
            id: user.id,
            content: msg,
            username: user.username,
        }
        socket.send(data)

        // 在自己的聊天框显示
        socket.onmessage(data)
        // 清空聊天框
        $chat_msg.value = ''
    })


}

var user = {
    id: '1',
    username: '习近平'
}
// 聊天列表
var clist_data = [{
    username: '王安石',
    summary: '我是王子文',
    id: '2',
    avatar: 'http://ww3.sinaimg.cn/mw1024/69b8b46egw1f5h32f4t07j20k00qojwp.jpg',
    newMessage: 3,
    messageHistory: []
},{
    username: '王安石',
    summary: '我是王子文',
    id: '112',
    avatar: 'http://ww3.sinaimg.cn/mw1024/69b8b46egw1f5h32f4t07j20k00qojwp.jpg',
    newMessage: 3,
    messageHistory: []
}]
Chat($('#chat'), user, clist_data)

var user1 = {
    id: '2',
    username: '王安石'
}


// 聊天列表
var clist_data = [{
    username: '习近平',
    summary: '我是王子文',
    id: '1',
    avatar: 'http://ww3.sinaimg.cn/mw1024/69b8b46egw1f5h32f4t07j20k00qojwp.jpg',
    newMessage: 3,
    messageHistory: []
},{
    username: '王安石',
    summary: '我是王子文',
    id: '112',
    avatar: 'http://ww3.sinaimg.cn/mw1024/69b8b46egw1f5h32f4t07j20k00qojwp.jpg',
    newMessage: 3,
    messageHistory: []
}]
Chat($('#fuck'), user1, clist_data)
