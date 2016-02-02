var http = require('http')

var fs = require('fs')

var upload = require('./md/upload.js')
var html = fs.readFileSync('./html')

var server = http.Server(function(req, res){
    var url = req.url
    switch( url){
        case '/':
            res.writeHead('200',{'Content-Type': 'text/html;charset=utf-8;'})
            res.end(html)
            break
        case '/upload':

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
                upload(nima)
                res.writeHead('200',{'Content-Type': 'text/text;charset=utf-8;'})
                res.end('haoa')
            })

    }
})

server.listen(3001)
