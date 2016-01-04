/*
* @Author: zikong
* @Date:   2015-12-26 23:28:03
* @Last Modified by:   zikong
* @Last Modified time: 2016-01-03 23:24:52
*/

'use strict';

function $(selector) {
    return document.querySelector(selector);
}
function getJson() {
    fetch('/json').then(function (data) {
        return data.json();
    }).then(function (data) {
        console.log(data);
    });
}
var userStore = {};
var chatsStore = [];
var currentId = 'all';
var $chats = document.querySelector('#chats');
var chats = {
    state: {
        data: []
    },
    render: function render() {
        var _this = this;

        $chats.innerHTML = '\n            ' + chatsStore.map(function (ele) {
            return '<div class="chat-item ' + (ele.uid == _this.cookie() ? 'mine' : 'friend') + '">\n                    <span>' + ele.username + '</span>\n                    <div><div class="content">' + ele.msg + '</div></div>\n                </div>';
        }).join(' ') + '\n        ';
        this.showMsg();
    },
    cookie: function cookie() {
        var cookie = document.cookie;
        if (cookie) {
            var _ret = (function () {
                var arr = cookie.split(';');
                var obj = {};

                arr.forEach(function (ele) {
                    ele = ele.trim();
                    var arr1 = ele.split('=');
                    obj[arr1[0]] = arr1[1];
                });
                return {
                    v: obj.uid
                };
            })();

            if (typeof _ret === 'object') return _ret.v;
        }
    },
    showMsg: function showMsg() {
        $chats.scrollTop = $chats.scrollHeight - $chats.clientHeight;
    }
};
var friends = {
    state: {
        data: []
    },
    render: function render(arr) {
        $('#friends').innerHTML = '' + arr.map(function (ele) {
            return '<li>' + ele + '</li>';
        }).join(' ');
    }
};
var socket = {
    socket: null,
    setInterval: [],
    state: {
        close: false,
        url: '',
        username: ''
    },
    events: {
        onpen: '',
        onclose: '',
        onmessage: ''
    },
    // 打开一个socket
    open: function open(url) {
        if (this.socket) return;
        console.log('socket url:', url);
        this.state.url = url || this.state.url;
        var sk = new WebSocket(this.state.url);
        // socket 收到消息
        sk.onmessage = (function (event) {
            // 收到的数据如果是json格式的花，需要自己解析
            // console.log( event.data );
            var data = JSON.parse(event.data);

            if (data.msg === undefined) {
                console.log(data);
                this.state.username = data.username;
                return;
            }
            chatsStore.push(data);
            chats.render();
            friends.render(data.friends);
        }).bind(this);
        // socket握手成功
        sk.onopen = (function (event) {
            this.socket = sk;
            this.state.close = false;
            this.clearInterval();

            socket.send(JSON.stringify({ username: socket.state.username }));
            console.log('打开了', new Date().getTime());
        }).bind(this);
        // socket关闭了
        sk.onclose = (function () {
            console.log('关闭了', new Date().getTime());
            this.socket = null;
            !this.state.close && this.reopen();
        }).bind(this);
        // socket 错误处理
        sk.onerror = function (e) {
            console.log('出错了', e);
        };
    },
    // 关闭socket
    close: function close() {
        this.state.close = true;
        this.send(JSON.stringify({
            close: true
        }));
        // console.log( this.socket, this.socket.CLOSED , this.socket.readyState );
        this.socket.close();
    },
    // 发送消息
    send: function send(data) {
        // console.log( this.socket );
        this.socket && this.socket.send(data);
    },
    // 重新打开
    reopen: function reopen() {
        var _this2 = this;

        console.log('正在重新打开');
        // return ;
        if (!this.state.url) this.open(this.state.url);
        this.setInterval.push(setInterval(function () {
            _this2.open();
        }, 2000));
    },
    // 清楚循环请求
    clearInterval: (function (_clearInterval) {
        function clearInterval() {
            return _clearInterval.apply(this, arguments);
        }

        clearInterval.toString = function () {
            return _clearInterval.toString();
        };

        return clearInterval;
    })(function () {
        this.setInterval.forEach(clearInterval);
        this.setInterval = [];
    })
};

// 登录
$('#enterSocket').addEventListener('click', function () {
    connectSocket();
});
$('#username').addEventListener('keyup', function (event) {
    event.keyCode == 13 && connectSocket();
});
$('#password').addEventListener('keyup', function (event) {
    event.keyCode == 13 && connectSocket();
});
function connectSocket() {
    var $us = $('#username');
    var $pw = $('#password');
    var username = ($us.value || '').trim();
    var password = ($pw.value || '').trim();
    if (!username || !password) return;

    socket.state.username = username;
    // cookie失败，密码登陆一次
    fetch('/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: 'username=' + username + '&password=' + password,
        credentials: 'include'
    }).then(function (data) {
        return data.json();
    }).then(function (data) {
        done(data);
    });
}

// 加载完成，使用cookie请求登陆一次
fetch('/login', {
    method: "GET",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    credentials: 'include'
}).then(function (data) {
    return data.json();
}).then(function (data) {
    console.log('尝试登录：', data);
    done(data);
});

function done(data) {
    if (data.status.code != 1001) return;
    $('#login').parentElement.removeChild($('#login'));
    $('#main').style.display = 'flex';
    var socketUrl = 'ws://' + location.hostname + ':9003/socket';
    var userStore = data.user;
    socket.open(socketUrl, userStore.name);
}

// 发送消息
var $send = $('#send');
function sendMsg() {
    var msg = $send.previousElementSibling.value;
    msg = msg.trim();
    if (!msg) return;
    if (!socket.socket) return;
    socket.send(JSON.stringify({
        msg: msg,
        toId: currentId,
        username: socket.state.username
    }));
    $send.previousElementSibling.value = '';
}
$send.addEventListener('click', function () {
    sendMsg();
});
$send.previousElementSibling.addEventListener('keyup', function (event) {
    event.keyCode === 13 && sendMsg();
});

window.onbeforeunload = function () {
    socket.close();
};
