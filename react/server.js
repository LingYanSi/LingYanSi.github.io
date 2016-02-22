'use strict'
var http = require('http')
var fs = require('fs')
var path = require('path')
var child_process = require('child_process')

var html = fs.readFileSync('./index.html')

var upload = require('../koa/md/upload.js')

var server = http.Server((req, res) => {
    let url = req.url;

    if( url=='/favicon.ico' ){
        res.writeHead('200', {
            'Content-Type': 'image/jpg;charset=utf-8;'
        })
        res.end('icons')
        return
    }else if (url.startsWith('/test')) {

        console.log( decodeURI( req.url ) )
        req.on('data', function( ch){
            console.log( ch.toString() )
        })

        var status = '200' ;
        if( url.endsWith('1') ) return
        if( url.endsWith('200') ) status = '200'
        if( url.endsWith('300') ) status = '300'
        if( url.endsWith('400') ) status = '400'
        if( url.endsWith('500') ) status = '500'
        res.writeHead(status, {
            'Content-Type': 'text/text;charset=utf-8;'
        })
        res.end(JSON.stringify({
                title: '走的是本地',
                content: '大河向东流，知道东海，再往东便是太平洋，太平洋世界最大的样，何其伟哉'
            }))
        return
    }

    if( url==='/upload'){
        res.writeHead('200', {
            'Content-Type': 'text/text;charset=utf-8;'
        })
        var arr = []

        req.on('data', function(chunck){
            try {
                console.log('图片接收中')
                arr.push(chunck)
            } catch (e) {

            }
        })

        req.on('end', ()=>{
            console.log('图片接收完毕---')
            var str = Buffer.concat( arr).toString('binary');
            var nima = str.split(/----[^\r]+\r\n/g)
            nima = nima.slice(1,-1)
            upload(nima,(data)=>{
                res.end( JSON.stringify({data: data}) )
            })
        })

        return
    }

    if (url.startsWith('/static') || url.startsWith('/dist')) {
        res.writeHead('200', {
            'Content-Type': 'text/text;charset=utf-8;'
        })

        // console.log( path.resolve(__dirname,'.'+req.url) )
        let fileUrl = path.resolve(__dirname, '.' + req.url) ;
        fs.exists( fileUrl, ( exists)=>{
            if( !exists ){
                res.end('{"title":"404","content":"找不到资源"}')
                return
            }
            var str = fs.readFileSync( fileUrl ).toString() ;
            res.end(str)

        } )
        return
    } else {
        res.writeHead('200', {
            'Content-Type': 'text/html;charset=utf-8;'
        })
        res.end(html)
        return
    }
})

server.listen('7001')

// 在浏览器中打开
child_process.exec('open http://localhost:7001')
