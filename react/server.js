
'use strict'
var http = require('http')
var fs = require('fs')
var path = require('path')
var child_process = require('child_process')

var html = fs.readFileSync('./index.html')

var server = http.Server((req, res)=>{
    let url = req.url ;
    if( url.startsWith('/static') || url.startsWith('/dist') ){
        res.writeHead('200',{
            'Content-Type': 'text/text;charset=utf-8;'
        })

        // console.log( path.resolve(__dirname,'.'+req.url) )
        var str = fs.readFileSync( path.resolve(__dirname,'.'+req.url) ).toString()
        !str? res.end('找不到资源') : res.end(str)
    }else{
        res.writeHead('200',{
            'Content-Type': 'text/html;charset=utf-8;'
        })
        res.end(html)
    }
})

server.listen('7001')

// 在浏览器中打开
child_process.exec('open http://localhost:7001')
