/*
 * @Author: zikong
 * @Date:   2015-12-26 22:40:03
 * @Last Modified by:   zikong
 * @Last Modified time: 2016-01-03 22:56:46
 */

'use strict';
/*
* 需要维护一个model 不同的id对应一个聊天室，单聊和群聊的本质是一样的
* 比如，我要宋小帆聊天，sendTo: sxf, 我要和高一群聊天，sendTo: gaoyi
* 每一次也要带上自己的id
* 每个用户，都有自己的id，以及一个对象{sxf:,gaoyi:}这样就可以判断和哪个用户聊天了
*/
var http = require('http');
var cookieParse = require('./parseCookie.js');

var socketServer = http.Server().listen(9003 );

var socketStore = {};
var firends = new Set() ;

socketServer.on('upgrade', function(req, socket, head) {
    if (req.url != '/socket') return

    // console.log('socket cookie:',cookieParse(req.headers.cookie) );

    var cookie = cookieParse(req.headers.cookie);
    if(socketStore[cookie.uid] && socketStore[cookie.uid].socket){
        console.log('socket不能重复链接:---+---',cookie);
        return
    }

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

    // var key = new Date().getTime();
    var name = '' ;

    // socketStore[key] = socket;
    socket.write(handshake);

    socketStore[cookie.uid] = socketStore[cookie.uid] || {} ;
    socketStore[cookie.uid].socket = socket ;

    // var arr = [];
    socket.on('data', function(data) {
            /*
             * 直接console.log(data.toString())会乱码
             * 原因是，从客户端传递过来的数据是加密过的，需要解密 decodeFrame 就是
             */
            var str = decodeFrame(data).Payload_data.toString();
            try {
                let obj = JSON.parse(str);
                // obj.msg === undefined && (name = obj.name, firends.add(obj.name)) ;
                // 默认进入广播大厅 @all
                obj.uid = cookie.uid ;
                if( !socketStore[cookie.uid].username ){
                    socketStore[cookie.uid].username = obj.username ;
                }

                // console.log('socket property',Object.keys(socket) );
                if(obj.close) socket.end();
                if(!obj.msg) return
                publish(obj);
            } catch (error) {
                // socket.close()
                console.log(error.message)
            }
            // publish(JSON.parse(str) );
        })
        .on('close', function() {
            /*
             * 昨晚有遇到一个问题 webscoket连接成功后，过几秒，就自动关闭了
             * 排查了一下，是设置了server.timeout = 3000 的原因
             * socket是长连接，自然是不能设置连接超时时间的
             */
            console.log('socket close');
            delete socketStore[cookie.uid].socket ;
            // firends.delete(name);
        })
        .on('end', function() {
            console.log(' socket end')
        })
        .on('send', function(data) {
            // var bufStr = new Buffer(data);
            // 发送的时候需要对内容进行编码，客户端接收的时候会自动解码
            // 发送数据只能发送buffer数据流，可以和客户端约定，每次发送的数据都是json格式的
            socket.write(encodeFrame(data));
        });

        console.log( '用户名：',socketStore[cookie.uid].username )
        if( socketStore[cookie.uid].username ){
            socket.emit('send', JSON.stringify({
                username: socketStore[cookie.uid].username
            }));
        }
});

function publish(obj ) {
    // console.log( obj );
    if( obj.toId == 'all' ){
        for(let item in socketStore){
            socketStore[item].socket && socketStore[item].socket.emit('send',JSON.stringify(obj) )
        }
        return
    }
    if( socketStore[ obj.toId ] && socketStore[ obj.toId ].socket ){
        let socket = socketStore[ obj.toId ].socket
        socket && socket.emit('send', JSON.stringify(obj) );
        return ;
    }
}

//处理掩码Buffer流(接收)
function decodeFrame(frame) {
    if (frame.length < 2) {
        return null;
    }

    var counter = 0,
        fin_offset = 7,
        opcode_offset = parseInt(1111, 2), //15
        mask_offset = 7,
        payload_len_offset = parseInt(1111111, 2), //127
        FIN,
        Opcode,
        MASK,
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

    // 长度超过65535的则由8个字节表示，因为4个字节能表达的长度为4294967295，已经完全够用，因此直接将前面4个字节置0
        buffer.writeUInt32BE(0, 2);
        buffer.writeUInt32BE(length, 6);
    } else if (length > 125) {
        buffer[1] = 126;

        // 长度超过125的话就由2个字节表示
        buffer.writeUInt16BE(length, 2);
    } else {
        buffer[1] = length;
    }

    // 写入正文
    buffer.write(message, index);
    return buffer;
}
