let http = require('http')
let net = require('net')
let url = require('url')

let httpServer = function(request, response){
    console.log('http请求', request.url)

    const u = url.parse(request.url)
    const options = {
        hostname : u.hostname,
        port     : u.port || 80,
        path     : u.path,
        method   : request.method,
        headers  : request.headers
    }

    let req = http.request(options, res => {
        // 响应头
        response.writeHead(res.statusCode, res.headers)
        res.pipe(response)
    })
    .on('error', err => {
        response.end()
    })

    // 触发end事件
    request.pipe(req)
}


let httpsServer = function(request, socket){
    console.log('https请求', request.url)
    let u = url.parse(`http://${request.url}`)

    let pSock = net.connect(u.port, u.hostname, ()=>{
        socket.write('HTTP/1.1 200 Connection Established\r\n\r\n')
        pSock.pipe(socket)
    }).on('error', ()=>{
        socket.end()
    })

    socket.pipe(pSock)
}

http.createServer().on('request', httpServer).on('connect', httpsServer).listen(8001)
console.log('开启代理')
