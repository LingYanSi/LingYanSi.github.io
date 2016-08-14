
// 联系人列表
function Contacts(data, $ele, $message, user){
    // store先简单点{}
    this.store = data || []
    this.$ele = $ele
    this.__ele = $ele[0]
    this.$message = $message
    this.chatCache = {}
    this.user = user

    this.event()

    this.render()
}

Contacts.skins = {
    default: `

    `
}

// 事件系统

// 渲染
Contacts.prototype.render = function(){
    // 生成html
    let html = this.store.map(user => {
        return `<div class="list-item" data-id="${user.id}">
            <a href="">${user.username}</a>
            <p class="">${user.summary}</p>
            <span>新消息:${user.newMessage}</span>
        </div>`
    }).join('')

    this.__ele.innerHTML = html
}

// 事件
Contacts.prototype.event = function(){
    let that = this
    this.$ele.on('click', '.list-item', function(event){
        // console.log('卧槽啊', this);
        this.classList.add('active')
        // 获取到兄弟元素
        Array.from(this.parentElement.children).forEach(ele => {
            if(ele != this){
                ele.classList.remove('active')
            }
        })

        let chat = that.createChat(this.dataset['id'])

        // 切换聊提按窗口
        that.activeChat && that.activeChat.$ele.hide()
        that.activeChat = chat
        that.activeChat && that.activeChat.$ele.show()
    })
}

Contacts.prototype.createChat = function(id){
    if(this.chatCache[id]) return this.chatCache[id]
    // 聊天信息
    let $message = this.$message

    let friend
    this.store.some(item => {
        if(item.id == id){
            friend = item
        }
    })

    let m_list_item = this.chatCache[id] = new Message(friend.messageHistory, $message, friend, this.user)

    return this.chatCache[id]
}

// 销毁
Contacts.prototype.destory = function(){

}


// 更新列表
Contacts.prototype.updateList = function(){

}

// 删除

// 添加

// 编辑

// 排序等等
