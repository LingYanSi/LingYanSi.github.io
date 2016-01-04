/*
 * @Author: zikong
 * @Date:   2015-12-20 16:31:43
 * @Last Modified by:   zikong
 * @Last Modified time: 2016-01-03 17:51:03
 */

'use strict';

var http = require('http');
var fs = require('fs');
var path = require('path');
var socket = require('./socket.js');
var md5 = require('md5');
var querystring = require("querystring");
var cookieParse = require('./parseCookie.js');
var os = require('os');
var childprocess = require('child_process');

var ROOT_PATH = path.resolve(__dirname);
// var   iconv = require('iconv-lite') ; // 解码 转码
// var socket = require('socket.io');
var chatStore = {};
var postData = '';

var server = http.Server(function(req, res) {
    // 解码url
    var url = decodeURI(req.url);
    res = flow(res);
    req.cookie = cookieParse(req.headers.cookie)|| {};
    // console.log(req.url, req.cookie, 'ip地址',req.connection.remoteAddress);
    /*
     * 已上等同于
     * res.statusCode = 200 ;
     * res.setHeader('key','vaule')
     */
    /*res.statusCode = 200 ;
    res.setHeader('Content-Type','text/plain;charset=utf-8;')*/

    route(url, req, res);

    // res.addTrailers({'Content-MD5': "7895bf4b8828b55ceaf47747b4bca667"});
});
// 监听错误
server.on('error', function(error) {
    console.log(error.msg);
});

// 监听端口
server.listen(9002,'0.0.0.0');

var ENO_ADDRESS = os.networkInterfaces().en0[1].address
childprocess.exec(`open http://${ENO_ADDRESS}:9002/`)
console.log('服务器已开启');

var setCookie = function(key, value, time) {
    // time 1day 1hour 1min 1s 1ms
    var cookieStr = `${key}=${value};expires=${new Date(new Date().getTime()+20*60*1000).toUTCString()};path=/;`
    return cookieStr;
}

var route = function(url, req, res) {
    // 一个简单的路由控制
    // 静态资源
    if (url.startsWith('/static')) {
        // console.log( url );
        let URL = path.resolve(ROOT_PATH, '.' + url);
        // 判断资源是否存在
        if (fs.existsSync(URL)) {
            // 存在就读取文件，返回出去
            let file = fs.readFileSync(URL);
            let type = URL.slice(URL.lastIndexOf('.') + 1);

            res.send(file, type);
        } else {
            // 不存在去返回不存在
            res.notFound('找不到资源')
        }
        return
    }
    // 首页
    if (url === '/' || url === '/index') {
        let html = fs.readFileSync('./static/view/index.html');
        res.send(html, 'html');

    } else if (url === '/about') {
        res.send('关于')

    } else if (/^\/topic\//.test(url)) {
        res.send(url.slice(7))

    } else if (url === '/json') {
        res.send({
            data: '我是json数据'
        }, 'json');

    } else if (url === '/sex') {
        let html = fs.readFileSync('./static/view/sex.html');
        res.send(html, 'html');

    } else if (url === '/login') {
        // 这个地方要处理一下 传递过来的参数 两种情况，post/get请求
        // 先获取cookie，看cookie中有没有信息，有的话返回去用户名
        // console.log(req.method)
        // res.write('登陆页面')
        if (req.method === 'POST') {
            req.on('data', function(chunck) {
                postData += chunck
            })
            req.on('end', function() {
                let data = querystring.parse(postData);
                // 恢复postData
                postData = '';
                // 登陆一下
                login(data, res);
            })
        } else {
            login(req.cookie, res)
        }
    } else {
        res.redirect('http://www.baidu.com');
    }
};

var login = function(obj, res) {
    /*res.redirect('http://192.168.1.11:9002/');
    return ;*/
    // 校验cookie
    if ( obj.uid ) {
        chatStore[obj.uid] && res.send({
            status:{
                code: 1001,
                msg: 'cookie成功1--',
            },
            user: {
                uid: obj.uid ,
                name: chatStore[obj.uid].username
            },
        }, 'json');
        !chatStore[obj.uid] && res.send({
            status:{
                code: 4001,
                msg: 'cookie错误',
            },
            user: {
                uid: md5Str ,
                name: obj.username
            },
        }, 'json');
        return
    }

    if (!obj.username || !obj.password) {
        // 用户名或者密码错误
        res.send({
            status:{
                code: 4001,
                msg: '用户名或者密码错误1---',
            },
            user: {
                uid: md5Str ,
                name: obj.username
            },
        }, 'json');
        return
    }
    var md5Str = md5(obj.username);
    if (chatStore[md5Str]) {
        if (chatStore[md5Str].password != obj.password) {
            // 用户名或者密码错误
            res.send({
                status:{
                    code: 4001,
                    msg: '用户名或者密码错误2---',
                },
                user: {
                    uid: md5Str ,
                    name: obj.username
                },
            }, 'json');
            return
        } else {
            // setcookie
            res.cookie.add('uid', md5Str);
            res.send({
                status:{
                    code: 1001,
                    msg: '登陆成功1--',
                },
                user: {
                    uid: md5Str ,
                    name: obj.username
                },
            }, 'json');
            return
        }
    }

    chatStore[md5Str] = {
        username: obj.username,
        password: obj.password,
        avatar: '',
    };
    // setcookie
    res.cookie.add('uid', md5Str);
    res.send({
        status:{
            code: 1001,
            msg: '登陆成功2--',
        },
        user: {
            uid: md5Str ,
            name: obj.username
        },
    }, 'json');

}

// 设置timeout
// server.timeout = 3000

var flow = function(res) {
    let obj = {
        status: 200,
        option: {
            'Content-Type': 'text/html;charset=utf-8;'
        },
        send(msg, type) {
            if (type) this.option['Content-Type'] = `text/${type};charset=utf-8;`;
            if (type == 'json') msg = JSON.stringify(msg)
            res.writeHead(this.status, this.option);
            msg && res.write(msg);
            res.end();
        },
        // 重定向
        redirect(url) {
            this.status = 302;
            this.option['Location'] = url;
            this.send();
        },
        notFound(msg) {
            this.status = 404;
            this.send(msg);
        },
        cookie: {
            add(key, value) {
                    obj.option['Set-Cookie'] = obj.option['Set-Cookie'] || [];
                    obj.option['Set-Cookie'].push(setCookie(key, value));
                },
                remove(key) {
                    if (!obj.option['Set-Cookie']) return
                    obj.option['Set-Cookie'].map((ele, index) => {
                        ele[key] && obj.option['Set-Cookie'].splice(index, 1)
                    })
                }
        },
        respond: res
    }
    return obj;
}

