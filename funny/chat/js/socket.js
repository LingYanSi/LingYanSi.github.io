function Socket(url, user){
    server.cache[user.id] = this

    // 接收数据
    this.receive = function(data){
        this.onmessage(data)
    }

    // 发送数据
    this.send = function(data){
        // 怎么发送呢？
        server(data)
    }
}

var server = function(data){
     let jdata = data instanceof String ? JSON.parse(data) : data

     server.cache[jdata.receiveId].receive(data)
}

server.cache = {}
