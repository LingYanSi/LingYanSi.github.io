/*
 * @Author: zikong
 * @Date:   2015-12-20 16:31:43
 * @Last Modified by:   zikong
 * @Last Modified time: 2015-12-26 11:47:49
 */

'use strict';

var http = require('http');
var fs = require('fs');
 // var   iconv = require('iconv-lite') ; // 解码 转码
// var socket = require('socket.io');
var server = http.Server(function(req, res) {
    // 解码url
    var url = decodeURI(req.url);

    res.writeHead(200, {
        'Content-Type': 'text/plain;charset=utf-8;',
        'Trailer': 'Content-MD5',
        // 设置多个cookie的方式
        'Set-Cookie': [setCookie('uid', 'songxiaofan'), setCookie('wife', 'songxiaofan')],
    });
    /*
     * 已上等同于
     * res.statusCode = 200 ;
     * res.setHeader('key','vaule')
     */

    route(url, req, res);

    // res.addTrailers({'Content-MD5': "7895bf4b8828b55ceaf47747b4bca667"});
    res.end();
});

var setCookie = function(key, value, time) {
    // time 1day 1hour 1min 1s 1ms
    var cookieStr = `${key}=${value};expires=${new Date(new Date().getTime()+30*1000).toUTCString()};path=/;`
    return cookieStr;
}

var route = function(url, req, res) {
    // 一个简单的路由控制

    if (url === '/' || url === '/index') {
        res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8;',
        });
        var html = fs.readFileSync('./index.html');
        res.write(html);

    } else if (url === '/about') {
        res.write('关于')

    } else if (/^\/topic\//.test(url)) {
        res.write(url.slice(7))

    } else if(url === '/json'){
        res.writeHead(200, {
            'Content-Type': 'text/json;charset=utf-8;',
        });
        var html = {data:'我爱宋小帆'};
        res.write(JSON.stringify(html));
    }else {
        res.write('找不到相关页面')
    }
};

let res = {
    send: function(msg) {
        res.write(msg);
    },
    sendFile: function(path) {

    }
}

// 监听错误
server.on('error', function(error) {
    console.log(error.msg);
});

// 监听端口
server.listen(9002);

// 设置timeout
// server.timeout = 3000


var socketStore = {};
var steam = new Buffer(0);
server.on('upgrade', function(req, socket, head) {
    if (req.url != '/socket') return

    // console.log('接收到了请求')

    var magicString = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
    var secWsKey = req.headers['sec-websocket-key'];
    var hash = require('crypto')
                 .createHash('SHA1')
                 .update(secWsKey + magicString)
                 .digest('base64'); // <- see that, silly.

    var handshake = "HTTP/1.1 101 Web Socket Protocol Handshake\r\n" +
                "Upgrade: WebSocket\r\n" +
                "Connection: Upgrade\r\n" +
                "Sec-WebSocket-Accept: " + hash + "\r\n" +
                "\r\n";

    var key = new Date().getTime();
    socketStore[key] = socket ;
    socket.write(handshake);

    // var arr = [];
    socket.on('data',function(data) {
        /*
        * 直接console.log(data.toString())会乱码
        * 原因是，从客户端传递过来的数据是加密过的，需要解密 decodeFrame 就是
        */
        // console.log( Object.keys( socket) )
        // console.log(data,'怎么了呢')
            // console.log( decodeFrame(data).Payload_data.toString() )
        //     let obj = {}
        // try{
        //      obj = JSON.parse( decodeFrame(data).Payload_data.toString() );
        // }catch(error){
        //     console.log(error.msg,error,'什么错误啊')
        // }
            var str = decodeFrame(data).Payload_data.toString('utf-8')
            // console.log(str);
            // var obj = JSON.parse('{"key":111,"msg":"撒旦法撒旦发生的广东分公司的解放根深蒂固那是的繁琐的 地方噶啥地方的身份广东省法国大书法家阿斯顿开了房间爱思考的减肥东方故事的风格接啊SD卡附近阿里地方郭德纲发生的"}');
            // console.log(obj)
            publish(JSON.parse(str) );
             // publish( `readable_data = decodeFrame(steam) ` , true);
        // var readable_data ;
        // steam = Buffer.concat([steam, data]);
        // while (decodeFrame(steam)) {
        //     readable_data = decodeFrame(steam)
        //     steam = readable_data.frame;
        //     var obj = JSON.parse( readable_data.Payload_data.toString() );
        //     publish(obj)
        // }
        // console.log( decodeFrame(data).Payload_data.toString() );
        // console.log( data , decodeFrame(data).Payload_data.toString(), data.toString('utf-8'));
    })
    .on('close',function() {
        /*
        * 昨晚有遇到一个问题 webscoket连接成功后，过几秒，就自动关闭了
        * 排查了一下，是设置了server.timeout = 3000 的原因
        * socket是长连接，自然是不能设置连接超时时间的
        */
        console.log('socket close',new Date().getTime());
    })
    .on('end',function() {
        console.log(' socket end',new Date().getTime())
    })
    .on('send',function(data) {
        // var bufStr = new Buffer(data);
        // 发送的时候需要对内容进行编码，客户端接收的时候会自动解码
        // 发送数据只能发送buffer数据流，可以和客户端约定，每次发送的数据都是json格式的
        socket.write(encodeFrame(data));
    });
    socket.emit('send',JSON.stringify({
        key: key
    }) );
    publish({
        msg: key+'进入了聊天室'
    })
    // var time = 0 ;
    // setInterval(()=>{ socket.emit('send','开始计数'+(time++))},1000);
});

function publish(obj, str){
    for(let ele in socketStore){
        // console.log( ele );
        if( !str ){
            socketStore[ele].emit('send',JSON.stringify({
                msg: obj.msg ,
                key: obj.key || '系统广播'
            }) );
        }else{
            socketStore[ele].emit('send', obj)
        }
    }
}

//处理掩码Buffer流(接收)
function decodeFrame(frame) {
    if (frame.length < 2) {
        return null;
    }

    var counter = 0,
        fin_offset = 7,
        opcode_offset = parseInt(1111, 2),   //15
        mask_offset = 7,
        payload_len_offset = parseInt(1111111, 2),   //127
        FIN ,
        Opcode ,
        MASK ,
        Payload_len,
        buffer,
        Masking_key,
        i,
        j;

    FIN = frame[counter] >> fin_offset;

    Opcode = frame[counter++] & opcode_offset;
    MASK = frame[counter] >> mask_offset;
    Payload_len = frame[counter++] & payload_len_offset;
    Payload_len === 126 && (Payload_len = frame.readUInt16BE(counter)) && (counter += 2);
    Payload_len === 127 && (Payload_len = frame.readUInt32BE(counter + 4)) && (counter += 8);

    buffer = new Buffer(Payload_len);
    if (MASK) {
        Masking_key = frame.slice(counter, counter + 4);
        counter += 4;
        for (i = 0; i < Payload_len; i++) {
            j = i % 4;
            buffer[i] = frame[counter + i] ^ Masking_key[j];
        }
    }
    if (frame.length < counter + Payload_len) {
        return undefined;
    }

    frame = frame.slice(counter + Payload_len);

    return {
        FIN: FIN,
        Opcode: Opcode,
        MASK: MASK,
        Payload_len: Payload_len,
        Payload_data: buffer,
        frame: frame
    };
}

//处理掩码Buffer流(发送)
function encodeFrame(message) {
    message = String(message);
    var length = Buffer.byteLength(message);

//  数据的起始位置，如果数据长度16位也无法描述，则用64位，即8字节，如果16位能描述则用2字节，否则用第二个字节描述
    var index = 2 + (length > 65535 ? 8 : (length > 125 ? 2 : 0));

//  定义buffer，长度为描述字节长度 + message长度
    var buffer = new Buffer(index + length);

//  第一个字节，fin位为1，opcode为1
    buffer[0] = 129;

//    因为是由服务端发至客户端，所以无需masked掩码
    if (length > 65535) {
        buffer[1] = 127;

//      长度超过65535的则由8个字节表示，因为4个字节能表达的长度为4294967295，已经完全够用，因此直接将前面4个字节置0
        buffer.writeUInt32BE(0, 2);
        buffer.writeUInt32BE(length, 6);
    } else if (length > 125) {
        buffer[1] = 126;

//      长度超过125的话就由2个字节表示
        buffer.writeUInt16BE(length, 2);
    } else {
        buffer[1] = length;
    }

//    写入正文
    buffer.write(message, index);
    return buffer ;
}
