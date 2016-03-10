
'use strict'
var fs = require('fs')
var http  = require('http')
var querystring = require('querystring')

// var REQUEST_URL = new URL('http://upload.f2e.mogujie.org/') // http://www.mogujie.com/zadmin/cms/upic
const option = {
    hostname: 'www.youku.com',
    // path: '/zadmin/cms/upic',
    method: 'GET',
    Connection: 'keep-alive',
    headers: {
        'Content-Type': 'text/html;' ,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.73 Safari/537.36'
    }
}

var post_data = querystring.stringify({
    filename: "嘿嘿和"
});

var req = http.request(option, function(res){
    var arr = []
    res.on('data', function(chunck){
        arr.push(chunck)
    })

    res.on('end', function(){
        arr = Buffer.concat( arr);
        console.log('这里', arr.toString())
    })
})

// req.write(post_data)
req.end()
