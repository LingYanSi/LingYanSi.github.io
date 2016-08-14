// 消息接收
// 单一的消息单元
/*
{
    content: '不啦啦啦',
    type: 'text',
    time: '',
    id: '',
    status: '发送中/正在接收中？',
    sender: 'lucy'
}
*/

function Message(data, $ele, friend, user){
    this.store = data || []

    let ele = document.createElement('div')
    ele.className = 'message-item'
    $ele[0].appendChild(ele)

    this.$ele = $(ele)
    this.__ele = ele
    this.friend = friend

    this.$ele.on('wheel', function(event){
        if(this.scrollTop == 0){
            // 去加载历史消息
            console.log('历史消息');
        }
    })

    this.is_have_history_message = true

    this.SELF = user

    this.render()

    this.scrollEnd()
}

// 渲染
Message.prototype.render = function(){
    // 生成html
    let html = this.store.map(user => {
        const IS_SELF = user.id == this.SELF.id

        return `<div class="message-list-item ${IS_SELF?'right':'left'}">
            <div class="user">
                <a href="">${user.username}</a>
            </div>
            <div class="content-wrap">
                <div class="content">
                ${user.content}
                </div>
            </div>
        </div>`
    }).join('')

    this.__ele.innerHTML = html
}

Message.prototype.add = function(...mes){
    this.store.push(...mes)

    // 如果正在浏览其他内容，就不滚动到底部了
    let IS_SCROLLEND = this.__ele.scrollTop == this.__ele.scrollHeight - this.__ele.clientHeight
    this.render()

    IS_SCROLLEND && this.scrollEnd()
}

// 滑动到底部
Message.prototype.scrollEnd = function(){
    let $ele = this.__ele
    $ele.scrollTop = $ele.scrollHeight
}

Message.prototype.getHistory = function(){
    // 获取历史消息
}
